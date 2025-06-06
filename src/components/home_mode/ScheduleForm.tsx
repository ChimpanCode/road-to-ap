import { Button } from '@mui/material'; // 先頭で追加

// 予定追加フォームのprops型定義
type Props = {
  eventTitle: string; // 入力中の予定タイトル
  setEventTitle: (v: string) => void; // タイトル変更時の関数
  eventDate: string; // 入力中の日付
  setEventDate: (v: string) => void; // 日付変更時の関数
  handleAddEvent: (e: React.FormEvent) => void; // フォーム送信時の関数
};

// 予定追加フォームコンポーネント
const ScheduleForm = ({
  eventTitle,
  setEventTitle,
  eventDate,
  setEventDate,
  handleAddEvent,
}: Props) => (
  // フォーム本体
  <form onSubmit={handleAddEvent} className="mt-8 flex flex-col items-center gap-2">
    {/* タイトル入力欄 */}
    <input
      type="text"
      placeholder="予定タイトル（例: 試験申し込み開始）"
      value={eventTitle}
      onChange={(e) => setEventTitle(e.target.value)}
      className="border px-2 py-1 rounded w-100"
    />
    {/* 日付入力欄 */}
    <input
      type="date"
      value={eventDate}
      onChange={(e) => setEventDate(e.target.value)}
      className="border px-2 py-1 rounded w-32"
    />
    {/* 追加ボタン */}
    <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, borderRadius: '9999px', fontWeight: 'bold', px: 4 }}
    >
        予定を追加
    </Button>
  </form>
);

export default ScheduleForm;