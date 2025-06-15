import { GoogleGenAI} from "@google/genai";


// 環境変数の読み込み
const GEMINI_API_KEY: string = import.meta.env.VITE_GEMINI_KEY;

// APIキーを使用してGoogleGenerativeAIのインスタンスを作成
const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// Geminiモデルを使用して用語クイズを生成するための関数
const generateQuizWithGemini = async (answerWord: string): Promise<string> => {
  // クイズ用に出力を修正するための指示文
  const prompt = `${answerWord}を解答とするようなクイズの問題文を一問生成してください。\n
  問題文以外は出力しないでください。\n
  ${answerWord}を使用した問題ではなく、必ず${answerWord}という用語名自体が解答となるような問題にしてください。\n`;

  // プロンプトに基づいてクイズの問題文を生成
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 500,
      temperature: 0.1,
    },
  });

  // テキストを抽出する前に undefined の可能性をチェック
  if (response.text === undefined) {
    console.error("Geminiモデルからの応答にテキストが含まれていませんでした。")
    throw new Error("Failed to generate quiz text: No text in response.");
  }
  // 生成されたテキストを取得
  return response.text;
};

// Geminiモデルを使用してクイズの問題文に対する回答が合っているかを判定するための関数
const checkAnswerWithGemini = async (question: string, answer: string): Promise<string> => {

  const prompt = `次のクイズの問題文に対する回答が正しいかどうかを判定してください。
    問題文: ${question}\n
    解答: ${answer}\n
    正しい場合は「正解」、間違っている場合は「不正解」とだけ出力してください。`;


  // プロンプトに基づいてクイズの問題文に対する回答が正しいかどうかを判定
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 500,
      temperature: 0.1,
    },
  });

  // テキストを抽出する前に undefined の可能性をチェック
  if (response.text === undefined) {
    console.error("Geminiモデルからの応答にテキストが含まれていませんでした。")
    throw new Error("Failed to generate quiz text: No text in response.");
  }
  // 生成されたテキストを取得
  return response.text;
}

// 任意のプロンプトに対してGemini APIを呼び出し、出力を取得する関数
const callGeminiAPI =  async (prompt: string): Promise<string> => {
  // プロンプトに基づいてGemini APIを呼び出し 出力を取得
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 500,
      temperature: 0.1,
    },
  });

  // テキストを抽出する前に undefined の可能性をチェック
  if (response.text === undefined) {
    console.error("Geminiモデルからの応答にテキストが含まれていませんでした。")
    throw new Error("Failed to generate quiz text: No text in response.");
  }
  // 生成されたテキストを取得
  return response.text;
}


// 音声データをGeminiに送り、文字起こししたテキストを返す関数
const transcribeAudioWithGemini = async (audioBlob: Blob): Promise<string> => {
  // 音声データをGemini APIに送信し

  // BlobをArrayBufferに変換
  const audioBuffer = await audioBlob.arrayBuffer();
  // Uint8Arrayに変換
  const audioData = new Uint8Array(audioBuffer);

  // Gemini APIの仕様に合わせてbase64エンコード
  const base64Audio = btoa(String.fromCharCode(...audioData));
  // Gemini APIに送信するためのデータ構造を作成
  const contents = [
    { text: `この音声を日本語で文字起こしし、文字起こしした内容のみを出力してください。` },
    {
      inlineData: {
        mimeType: "audio/webm", // 録音形式に合わせて変更
        data: base64Audio,
      },
    },
  ];

  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
  });

  // テキストを抽出する前に undefined の可能性をチェック
  if (response.text === undefined) {
    console.error("Geminiモデルからの応答にテキストが含まれていませんでした。")
    throw new Error("Failed to generate quiz text: No text in response.");
  }
  // 生成されたテキストを取得
  return response.text;
}

// transcribedTextとtargetWordをGeminiに送り、一致度判定を行う関数
const evaluateTextWithGemini = async (transcribedText: string, targetWord: string): Promise<string> => {

  // 言語化した内容とターゲットの用語の概要がどれくらい一致しているかを評価するプロンプトを作成
  const prompt = `
    ${targetWord}の概要について、最後に与える「」で囲まれたテキストとどれくらい一致しているかを
    100点満点で評価し、点数と評価理由を教えてください。
    出力するテキストは、(点数)(評価理由)のようにそれぞれを()で囲み、それ以外は出力しないでください。\n
      テキスト: 「${transcribedText}」\n
    `;

  // プロンプトに基づいて言語化した内容とターゲットの用語の概要がどれくらい一致しているかを評価
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 500,
      temperature: 0.1,
    },
  });

  // テキストを抽出する前に undefined の可能性をチェック
  if (response.text === undefined) {
    console.error("Geminiモデルからの応答にテキストが含まれていませんでした。")
    throw new Error("Failed to generate quiz text: No text in response.");
  }
  // 生成されたテキストを取得
  return response.text;
}


// エクスポートをまとめて行う
export {  generateQuizWithGemini, checkAnswerWithGemini, transcribeAudioWithGemini, evaluateTextWithGemini, callGeminiAPI };