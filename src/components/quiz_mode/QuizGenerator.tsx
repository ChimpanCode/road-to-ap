import { useState, useEffect, useRef } from 'react';
// 外部関数のインポート
import { generateQuizWithGemini, checkAnswerWithGemini } from '../../utils/gemini';
import { pickRandomWord } from '../../utils/common';

// コンポーネントのインポート
import QuestionDisplay from './QuestionDisplay';
import AnswerForm from './AnswerForm';
import ControlButtons from './ControlButtons';

type Props = {
  answerWordList: string[];
  endQuiz: () => void;
};

const QuizGenerator = ({ answerWordList, endQuiz }: Props) => {
  const [questionText, setQuestionText] = useState('');
  const [answerWord, setAnswerWord] = useState(''); // クイズの解答となる用語
  const [isLoading, setIsLoading] = useState(false); // クイズ生成中のローディング状態を管理するuseState
  const [userAnswer, setUserAnswer] = useState(""); // ユーザーの回答
  const inputRef = useRef<HTMLInputElement>(null); // 入力フィールドの参照

  // Gemini APIを呼び出してクイズを一問生成しステートに保存する関数
  const generateQuiz = async () => {
    const answerWord: string = pickRandomWord(answerWordList)// 候補からランダムに選ばれた用語を取得
    setAnswerWord(answerWord); // 正解判定用のStateにセット
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

      {/* 問題文の表示 クイズを生成中かどうかで表示を切り替える */}
      <QuestionDisplay questionText={questionText} isLoading={isLoading} />

      {/* 回答フォームと送信ボタン */}
      <AnswerForm
        userAnswer={userAnswer}  
        setUserAnswer={setUserAnswer}
        checkAnswer={checkAnswer}
        isLoading={isLoading}
        inputRef={inputRef} // 入力フィールドの参照を渡す
      />
      
      {/* 次の問題へボタンとクイズ終了ボタン */}
      <ControlButtons
        isLoading={isLoading}
        generateQuiz={generateQuiz}
        endQuiz={endQuiz}
      />
    </main>
  );
};

export default QuizGenerator;