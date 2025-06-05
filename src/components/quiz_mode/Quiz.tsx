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

    // // データベース（Firestore）から用語を取得して配列化する関数
    // const fetchTerms = async (): Promise<void> => {
    //   const querySnapshot = await getDocs(collection(db, "itTerms"));
    //   console.log(1111111111);
    //   const terms = querySnapshot.docs
    //     .map(doc => doc.data().term)
    //     .filter((term): term is string => !!term);
    //   setAnswerWordList(terms);
    //   console.log("用語リスト:", terms);
    // };

    // // 初回マウント時のみfetchTermsを実行
    // useEffect(() => {
    //   fetchTerms();
    // }, []);


  return (
    <>
      {!isQuizStarted ? (
        <div>
          {/* クイズモード開始前の画面内容 */}
          <p>このモードでは、応用情報技術者試験に出現するIT用語に関するクイズが生成AIによって出題されます。</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
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