import { GoogleGenerativeAI } from "@google/generative-ai";

// 環境変数の読み込み
const API_KEY: string = import.meta.env.VITE_GEMINI_KEY;

// APIキーを使用してGoogleGenerativeAIのインスタンスを作成
const genAI = new GoogleGenerativeAI(API_KEY);

// Geminiモデルを使用してテキストを生成するための関数
const startGemini = async (prompt: string): Promise<string> => {
  // gemini-pro モデルを使用
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  console.log("Gemini model initialized"); // デバッグ用のログ

  // クイズ用に出力を修正するための指示文をモデルに渡しておく

  // プロンプトに基づいてテキストを生成
  const result = await model.generateContent(prompt);
  console.log("Text generation completed");

  // 生成されたテキストを取得
  const response = await result.response;

  // テキストを抽出
  const text = response.text();

  return text;
};

// Gemini APIを停止する関数？

// エクスポートをまとめて行う
export { startGemini };