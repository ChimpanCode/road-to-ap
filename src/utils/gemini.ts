import { GoogleGenerativeAI} from "@google/generative-ai";


// 環境変数の読み込み
const API_KEY: string = import.meta.env.VITE_GEMINI_KEY;

// APIキーを使用してGoogleGenerativeAIのインスタンスを作成
const genAI = new GoogleGenerativeAI(API_KEY);

// Geminiモデルを使用して用語クイズを生成するための関数
const generateQuizWithGemini = async (answerWord: string): Promise<string> => {
  // gemini-2.0-flash モデルを使用
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  console.log("Gemini model initialized"); // デバッグ用のログ

  // クイズ用に出力を修正するための指示文をモデルに渡しておく
  const prompt = `${answerWord}を解答とするようなクイズの問題文を一問生成してください。\n
    問題文以外は出力しないでください。\n
    ${answerWord}を使用した問題ではなく、必ず${answerWord}という用語名自体が解答となるような問題にしてください。\n`;

  // プロンプトに基づいてテキストを生成
  const result = await model.generateContent(prompt);
  console.log("Text generation completed");

  // 生成されたテキストを取得
  const response = await result.response;

  // テキストを抽出
  const text = response.text();

  return text;
};

// Geminiモデルを使用してクイズの問題文に対する回答が合っているかを判定するための関数
const checkAnswerWithGemini = async (question: string, answer: string): Promise<string> => {
  // gemini-2.0-flash モデルを使用
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // クイズの問題文と解答をモデルに渡して判定を行う
  const prompt = `次のクイズの問題文に対する回答が正しいかどうかを判定してください。
    問題文: ${question}\n
    解答: ${answer}\n
    正しい場合は「正解」、間違っている場合は「不正解」とだけ出力してください。`;

  // プロンプトに基づいてテキストを生成
  const result = await model.generateContent(prompt);

  // 生成されたテキストを取得
  const response = await result.response;

  // テキストを抽出
  const text = response.text();

  return text;
}


// 音声データをGeminiに送り、文字起こししたテキストを返す関数
const transcribeAudioWithGemini = async (audioBlob: Blob): Promise<string> => {
  // 音声データをGemini APIに送信し
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // BlobをArrayBufferに変換
  const audioBuffer = await audioBlob.arrayBuffer();
  // Uint8Arrayに変換
  const audioData = new Uint8Array(audioBuffer);

  // Gemini APIの仕様に合わせてmultipartやbase64などに変換が必要な場合はここで変換
  // ここではbase64エンコード例
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
// generateContentに配列を直接渡す
  const result = await model.generateContent(contents);
  const response = await result.response;
  const text = response.text();
  return text;
}

// transcribedTextとtargetWordをGeminiに送り、一致度判定を行う関数
const evaluateTextWithGemini = async (transcribedText: string, targetWord: string): Promise<string> => {
  // geminiのモデルを指定
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // 言語化した内容とターゲットの用語の概要がどれくらい一致しているかを評価するプロンプトを作成
  const prompt = `
    ${targetWord}の概要について、最後に与える「」で囲まれたテキストとどれくらい一致しているかを
    100点満点で評価し、点数と評価理由を教えてください。
    出力するテキストは、(点数)(評価理由)のようにそれぞれを()で囲み、それ以外は出力しないでください。\n
      テキスト: 「${transcribedText}」\n
    `;

  // プロンプトに基づいてテキストを生成
  const result = await model.generateContent(prompt);

  // 生成されたテキストを取得
  const response = await result.response;

  // テキストを抽出
  const text = response.text();

  

  return text;
}


// エクスポートをまとめて行う
export {  generateQuizWithGemini, checkAnswerWithGemini, transcribeAudioWithGemini, evaluateTextWithGemini };