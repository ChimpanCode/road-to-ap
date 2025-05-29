import { useState, useEffect, useRef } from 'react';
// 外部関数のインポート
import { generateQuizWithGemini, checkAnswerWithGemini } from '../../utils/gemini';
import { pickRandomWord } from '../../utils/common';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ReactMarkdown from 'react-markdown';
import Button from '@mui/material/Button';

type Props = {
  answerWordList: string[];
  endQuiz: () => void;
};

const QuizGenerator = ({ answerWordList, endQuiz }: Props) => {
  const [questionText, setQuestionText] = useState('');
  const [answerWord, setAnswerWord] = useState(''); // クイズの解答となる用語
  const [isAnswerVisible, setIsAnswerVisible] = useState(false); // 解答表示用のuseState
  const [isLoading, setIsLoading] = useState(false); // クイズ生成中のローディング状態を管理するuseState
  const [userAnswer, setUserAnswer] = useState(""); // ユーザーの回答
  const inputRef = useRef<HTMLInputElement>(null); // 入力フィールドの参照

  // Gemini APIを呼び出してクイズを一問生成しステートに保存する関数
  const generateQuiz = async () => {
    const answerWord: string = pickRandomWord(answerWordList)// 候補からランダムに選ばれた用語を取得
    setAnswerWord(answerWord); // 正解判定用のStateにセット
    setIsAnswerVisible(false); // クイズ生成時に解答を非表示にする
    setIsLoading(true); // ローディング状態を開始
    setUserAnswer(""); // ユーザーの回答をリセット
    try {
      const response = await generateQuizWithGemini(answerWord);
      setQuestionText(response);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setQuestionText("エラーが発生しました");
    } finally {
      setIsLoading(false); // ローディング状態を終了
    }
  };


  // クイズの回答を送信し正解判定を行う関数
  const checkAnswer = async () => {
    if (userAnswer === "") {
      alert("回答を入力してください");
      return;
    }
    //setIsLoading(true); // ローディング状態を開始
    try {
      const result = await checkAnswerWithGemini(questionText, userAnswer);
      alert(`${result}\n正解: ${answerWord}`);
      generateQuiz();
      setUserAnswer("");
    } catch (error) {
      console.error("Error checking answer:", error);
      alert("エラーが発生しました");
      generateQuiz();
      setUserAnswer("");
    } finally {
      //setIsLoading(false); // ローディング状態を終了
    }
  }

  //クイズスタート時に一問目を生成するためのuseEffect
  useEffect(() => {
    if (answerWordList.length > 0) {
      generateQuiz();
    }
  }, []);

  // フォーカス制御
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [questionText, isLoading]); // 問題が変わるたびにフォーカス

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-sky-100">
      <h3 className="text-gray-700 text-5xl font-bold"></h3>
      <div
        className="flex justify-center items-center font-bold text-3xl w-3/4 h-1/3 mt-20 bg-white rounded-lg shadow-lg p-4"
        style={{
          border: "2px solid #1976d2",
          borderRadius: "12px",
          background: "#f5faff",
          minHeight: "120px",
          marginBottom: "16px",
        }}
      >
        {/* クイズを生成中かどうかで表示を切り替える */}
        {isLoading ? (
          <p>生成中...</p>
        ) : (
          <ReactMarkdown>{questionText}</ReactMarkdown>
        )}
      </div>
      <div>
        {/* 解答の表示 */}
        {isAnswerVisible && <p>{answerWord}</p>}
      </div>


      {/* 回答フォーム */}
      <div className="mt-8 flex items-center space-x-2">
        <TextField
          label="あなたの回答"
          variant="outlined"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isLoading}
          size="medium"
          style={{ minWidth: 240 }}
          inputRef={inputRef} // 入力フィールドの参照を設定
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !isLoading &&
              userAnswer.trim() !== ""
            ) {
              checkAnswer();
            }
          }}
        />
        {/* 送信ボタン */}
        <IconButton
          color="primary"
          onClick={checkAnswer}
          disabled={isLoading || !userAnswer}
          style={{
            height: 40,
            width: 40,
            marginLeft: 4,
            marginTop: 7,
            border: "1px solid #1976d2",
            background: "#f5faff",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <SendIcon style={{ fontSize: 28, verticalAlign: "middle" }} />
        </IconButton>
      </div>

      {/* 次の問題へボタン */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={endQuiz}
          style={{ minWidth: 120, fontWeight: "bold" }}
          disabled={isLoading}
        >
          クイズを終了
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={generateQuiz}
          style={{ minWidth: 200, fontWeight: "bold", fontSize: "1.1em" }}
          disabled={isLoading}
        >
          次の問題へ
        </Button>
      </div>
    </main>
  );
};

export default QuizGenerator;