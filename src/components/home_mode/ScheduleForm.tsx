type Props = {
  eventTitle: string;
  setEventTitle: (v: string) => void;
  eventDate: string;
  setEventDate: (v: string) => void;
  handleAddEvent: (e: React.FormEvent) => void;
};

const ScheduleForm: React.FC<Props> = ({
  eventTitle,
  setEventTitle,
  eventDate,
  setEventDate,
  handleAddEvent,
}) => (
  <form onSubmit={handleAddEvent} className="mt-8 flex flex-col items-center gap-2">
    <input
      type="text"
      placeholder="予定タイトル（例: 試験申し込み開始）"
      value={eventTitle}
      onChange={(e) => setEventTitle(e.target.value)}
      className="border px-2 py-1 rounded w-100"
    />
    <input
      type="date"
      value={eventDate}
      onChange={(e) => setEventDate(e.target.value)}
      className="border px-2 py-1 rounded w-32"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
    >
      予定を追加
    </button>
  </form>
);

export default ScheduleForm;