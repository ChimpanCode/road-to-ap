//一旦ここに入力フォームとGeminiからの返答を表示するコンポーネントを作成し、後で分割する
import { useState, useEffect } from 'react';
import DaysLeft from './DaysLeft';
import { db } from '../../utils/firebase';
import { doc, collection, setDoc, Timestamp, getDocs, query, orderBy } from 'firebase/firestore';

//申し込み日時については、ユーザー毎ではなく、共通の予定にしたい

const Home = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [schedules, setSchedules] = useState<
    { id: string; title: string; date: string; createdAt: any }[]
  >([]);


   // 予定をデータベースに保存
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) {
      setMessage('タイトルと日付を入力してください');
      return;
    }
    try {
      const docRef = doc(collection(db, 'schedules'));
      await setDoc(docRef, {
        id: docRef.id,
        title: eventTitle,
        date: eventDate,
        createdAt: Timestamp.now(),
      });
      setMessage('予定を追加しました');
      setEventTitle('');
      setEventDate('');
    } catch (error) {
      setMessage('追加に失敗しました');
    }
  };

  // Firestoreから予定一覧を取得
  const fetchSchedules = async () => {
    const q = query(collection(db, 'schedules'), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as { id: string; title: string; date: string; createdAt: any }[];
    setSchedules(data);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <>
      <DaysLeft></DaysLeft>
      <form onSubmit={handleAddEvent} className="mt-8 flex flex-col items-center gap-2">
        {/* 予定追加フォーム */}
        <input
          type="text"
          placeholder="予定タイトル（例: 試験申し込み開始）"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="border px-2 py-1 rounded w-64"
        />
        {/* 予定追加フォーム */}
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="border px-2 py-1 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          予定を追加
        </button>
        {message && <div className="text-sm text-gray-700 mt-2">{message}</div>}
      </form>

      {/* 登録済み予定の表示 */}
      <div className="mt-8 w-full flex flex-col items-center">
        <ul className="w-80 flex flex-col gap-4">
          {schedules.length === 0 && (
            <li className="text-gray-500">まだ予定がありません</li>
          )}
          {schedules.map((schedule) => (
            <li 
            key={schedule.id} 
            className="border border-4 border-black rounded-lg py-4 px-4 flex flex-col items-start shadow bg-white"
            >
              <span className="font-semibold">{schedule.title}</span>
              <span className="ml-4 text-gray-600">{schedule.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;