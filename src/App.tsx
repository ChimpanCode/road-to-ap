import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'

import React from 'react'


// 外部関数のインポート
import Home from './components/Home';


function App() {
  //ブラウザ更新時にログインをいちいちしなくて済むようにログインの状態をステートとして記録
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const answerWordsList: string[] = ["りんご", "なし", "みかん", "ぶどう", "いちご", "もも", "さくらんぼ", "バナナ", "キウイ", "パイナップル", "マンゴー"];
  // 一旦配列の中からランダムに選ぶ
  const randomIndex = Math.floor(Math.random() * answerWordsList.length);
  const randomWord = answerWordsList[randomIndex];
  // 正解判定用のuseState

  return (
    <>
      <Home></Home>
    </>
  )
}

export default App
