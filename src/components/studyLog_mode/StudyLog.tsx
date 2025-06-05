//  学習記録を表示するcomponent

// 何をデータベースに記録するか
// 一旦何問解いたかを記録する
// Firebaseを認証に使うとgoogleアカウントに紐づけられるので
// そのアカウントでログインしているユーザーの学習記録を表示する？
// 勉強時間を記録したい（自分で入力）

//import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const sample_data = [
  { date: '2024-05-25', count: 5 },
  { date: '2024-05-26', count: 8 },
  { date: '2024-05-27', count: 3 },
];

const StudyLog = () => {
  return (
    <>
      <BarChart width={400} height={300} data={sample_data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <LineChart width={400} height={300} data={sample_data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </>
  )
}

export default StudyLog