//一旦ここに入力フォームとGeminiからの返答を表示するコンポーネントを作成し、後で分割する
import { useState, useEffect } from 'react';
import DaysLeft from './DaysLeft';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';
import { db } from '../../utils/firebase';
import { doc, collection, setDoc, Timestamp, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//申し込み日時については、ユーザー毎ではなく、共通の予定にしたい

const Home = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [schedules, setSchedules] = useState<
    { id: string; title: string; date: string; createdAt: any }[]
  >([]);


   // 予定をデータベースに保存
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) {
      toast.warn('タイトルと日付を入力してください');
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
      setEventTitle('');
      setEventDate('');
      await fetchSchedules(); // 追加後に最新の予定一覧を取得して反映
    } catch (error) {
      alert('追加に失敗しました');
    }
  };

  // 予定をデータベースから削除
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'schedules', id));
      setSchedules((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      alert('削除に失敗しました');
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
      <ToastContainer />
      <DaysLeft></DaysLeft>
      <ScheduleForm
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventDate={eventDate}
        setEventDate={setEventDate}
        handleAddEvent={handleAddEvent}
      />
      <ScheduleList schedules={schedules} handleDelete={handleDelete} />
    </>
  );
};

export default Home;