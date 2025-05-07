import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'

import React from 'react'


// 外部関数のインポート
import Home from './components/Home';
import Navbar from './components/Navbar';
import Gemini from './components/Gemini';
import VoiceInput from './components/VoiceInput';


function App() {
  //ブラウザ更新時にログインをいちいちしなくて済むようにログインの状態をステートとして記録
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const answerWordsList: string[] = ["りんご", "なし", "みかん", "ぶどう", "いちご", "もも", "さくらんぼ", "バナナ", "キウイ", "パイナップル", "マンゴー"];
  // 一旦配列の中からランダムに選ぶ
  const randomIndex = Math.floor(Math.random() * answerWordsList.length);
  const randomWord = answerWordsList[randomIndex];
  // 正解判定用のuseState

  return (
    <Router>
      <div>
        {/* ナビゲーションメニュー */}
        <Navbar></Navbar>

        {/* ルーティング設定 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Gemini />} />
          <Route path="/voice" element={<VoiceInput />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
