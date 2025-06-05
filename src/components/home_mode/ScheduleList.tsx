import { MdDelete } from "react-icons/md";

// 予定データの型定義
type Schedule = {
  id: string;
  title: string;
  date: string;
  createdAt: any;
};

// propsの型定義
type Props = {
  schedules: Schedule[]; // 予定リスト
  handleDelete: (id: string) => void; // 削除ボタン押下時の処理
};

// 予定一覧を表示するコンポーネント
const ScheduleList: React.FC<Props> = ({ schedules, handleDelete }) => (
  <div className="mt-8 w-full flex flex-col items-center">
    <ul className="w-80 flex flex-col gap-4">
      {/* 予定がない場合の表示 */}
      {schedules.length === 0 && (
        <li className="text-gray-500">まだ予定がありません</li>
      )}
      {/* 予定がある場合はリスト表示 */}
      {schedules.map((schedule) => (
        <li
          key={schedule.id}
          className="border border-4 border-black rounded-lg py-4 px-4 flex items-center justify-between shadow bg-white"
        >
          {/* タイトルと日付を縦並びで表示 */}
          <div className="flex flex-col">
            <span className="font-semibold">{schedule.title}</span>
            <span className="text-gray-600">{schedule.date}</span>
          </div>
          {/* 削除ボタン（ゴミ箱アイコン付き） */}
          <button
            onClick={() => handleDelete(schedule.id)}
            className="ml-4 px-4 py-2 bg-red-400 text-white font-bold rounded-full shadow hover:bg-red-700 transition"
            aria-label="削除"
          >
            <MdDelete size={20} />
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default ScheduleList;