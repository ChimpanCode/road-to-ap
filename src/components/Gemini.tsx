import React, { useState } from 'react';
// 外部関数のインポート
import { startGemini } from '../utils/gemini';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ReactMarkdown from 'react-markdown';
import Button from '@mui/material/Button';

import { ANSWER_WORDS_LIST } from '../constants/constants';

const Gemini = () => {
  const [outputText, setOutputText] = useState('ここに問題文が表示されます');
  const [answerWord, setAnswerWord] = useState(''); // 正解判定用のuseState
  const [isAnswerVisible, setIsAnswerVisible] = useState(false); // 解答表示用のuseState
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を管理するuseState

  // Gemini APIを使用してテキストを生成する関数
  const callGemini = async () => {
    const answerWord: string = pickRandomWord()
    setAnswerWord(answerWord); // 正解判定用のStateにセット
    setIsAnswerVisible(false); // クイズ生成時に解答を非表示にする
    setIsLoading(true); // ローディング状態を開始
    const prompt = `${answerWord}を解答とするようなクイズの問題文を一問生成してください。\n
    問題文以外は出力しないでください。\n
    ${answerWord}を使用した問題ではなく、${answerWord}自体が解答となるような問題にしてください。\n`;

    try {
      const response = await startGemini(prompt);
      setOutputText(response);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setOutputText("エラーが発生しました");
    } finally {
      setIsLoading(false); // ローディング状態を終了
    }
  };

  //配列からランダムに単語を選んで返す関数
  const pickRandomWord = () => {
    const answerWordsList: string[] = ["スタック", "MACアドレス", "シェルソート", "バブルソート", "クイックソート"];
    const randomIndex = Math.floor(Math.random() * answerWordsList.length);
    return answerWordsList[randomIndex];
  };

  // クイズの解答を表示する関数
  // 条件付きレンダリング
  const showAnswer = () => {
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-sky-100">
      <h3 className="text-gray-700 text-5xl font-bold"></h3>
      <div className="flex justify-center items-center font-bold text-3xl w-3/4 h-1/3 mt-20 bg-white rounded-lg shadow-lg p-4">
        {/* クイズを生成中かどうかで表示を切り替える */}
        {isLoading ? (
          <p>生成中...</p>
        ) : (
          <ReactMarkdown>{outputText}</ReactMarkdown>
        )}
      </div>
      <div>
        {isAnswerVisible && <p>{answerWord}</p>} {/*  */}
      </div>
      <div className="w-1/2 mt-20 flex flex-col justify-center items-center space-y-4">
        <Button
          variant="contained"
          color="primary"
          onClick={callGemini}
        >
          クイズを出題
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsAnswerVisible(true)}
        >
          解答を表示
        </Button>
      </div>
    </main>
  );
};

export default Gemini;