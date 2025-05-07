//一旦ここに入力フォームとGeminiからの返答を表示するコンポーネントを作成し、後で分割する

import React from 'react';
import { useState } from 'react';

import DaysLeft from './DaysLeft';
import Gemini from './Gemini';
import VoiceInput from './VoiceInput';


const Home = () => {
  
  return (
    <>
    <h1>デモ</h1>
      <DaysLeft></DaysLeft>
    </>
  );
};

export default Home;