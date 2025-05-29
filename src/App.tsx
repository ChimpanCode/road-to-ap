import { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./utils/firebase";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'


// 外部関数のインポート
import Home from './components/home_mode/Home';
import Navbar from './components/Navbar';
import Verbalization from './components/verbalization_mode/Verbalization';
import Login from './components/Login';
import Quiz from './components/quiz_mode/Quiz';
import StudyLog from "./components/studyLog_mode/StudyLog";


function App() {
  //ブラウザ更新時にログインをいちいちしなくて済むようにログインの状態をステートとして記録
  //const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [answerWordList, setAnswerWordList] = useState<string[]>([]);

  useEffect(() => {
    // Firestoreのコレクションにリアルタイムリスナーを設定
    const unsubscribe = onSnapshot(collection(db, "itTerms"), (querySnapshot) => {
      const terms = querySnapshot.docs
        .map(doc => doc.data().term)
        .filter((term): term is string => !!term);
      setAnswerWordList(terms);
    });

    // クリーンアップ: コンポーネントアンマウント時にリスナー解除
    return () => unsubscribe();
  }, []);
  

  return (
    <Router>
      <div>
        {/* ナビゲーションメニュー */}
        <Navbar></Navbar>

        {/* ルーティング設定 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz answerWordList={answerWordList}/>} />
          <Route path="/verbalize" element={<Verbalization answerWordList={answerWordList}/>} />
          <Route path="/studyLog" element={<StudyLog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
