import { useState } from 'react';
import QuizGenerator from './QuizGenerator';
import Button from '@mui/material/Button';

type QuizProps = {
  answerWordList: string[];
};

const Quiz = ({answerWordList}: QuizProps) => {
    //const [answerWordList, setAnswerWordList] = useState<string[]>([]); // クイズの解答となる用語の候補リスト


    //用語クイズが開始されているかどうかを管理するuseState
    const [isQuizStarted, setIsQuizStarted] = useState(false); // クイズ開始状態を管理するuseState

    //クイズを開始する関数
    const startQuiz = () => {
        setIsQuizStarted(true); // クイズ開始状態をtrueにする
        //callGemini(); // Gemini APIを呼び出してクイズを生成
    }

    //クイズを終了する関数
    const endQuiz = () => {
      setIsQuizStarted(false);
      // 結果の保存や状態リセットなど
    };


  return (
    <>
      {!isQuizStarted ? (
        <div>
          {/* クイズモード開始前の画面内容 */}
          <p className="max-w-xl mx-auto mt-8 mb-6 bg-blue-50 rounded-xl px-6 py-5 text-center text-base text-gray-800 font-medium shadow">
            このモードでは、応用情報技術者試験に出現するIT用語に関するクイズが生成AIによって出題されます。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="contained"
              color="secondary"
              onClick={startQuiz}
              style={{ minWidth: 160, fontWeight: "bold" }}
            >
              クイズを開始
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* クイズモードの画面内容をここに記述 */}
          <QuizGenerator answerWordList={answerWordList} endQuiz={endQuiz}></QuizGenerator>
          {/* 他のクイズ用UIもここに追加 */}
        </div>
      )}
    </>
  )
}

export default Quiz