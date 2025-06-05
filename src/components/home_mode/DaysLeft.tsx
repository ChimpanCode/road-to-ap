// date-fnsを利用して応用情報技術者試験日までの残り日数を表示するコンポーネント
import { differenceInDays } from 'date-fns'; // 日付の差分を計算する関数をインポート
//import { TARGET_DATE } from '../constants/constants'; // 試験日を定義した定数をインポート
import { TARGET_DATE } from '../../constants/constants';

const DaysLeft = () => {
  const today = new Date(); // 現在の日付を取得
  const daysLeft = differenceInDays(TARGET_DATE, today); // 試験日までの残り日数を計算
  const formattedTargetDate = TARGET_DATE.toLocaleDateString(); // 試験日をフォーマット

  return (
    <div className="text-center mt-10"> {/* 中央揃えのスタイルを適用 */}
      <h2 className="text-2xl font-bold">応用情報技術者試験日: {formattedTargetDate}</h2> {/* 見出し */}
      <h2 className="text-2xl font-bold">残り {daysLeft}日</h2> {/* 見出し */}
    </div>
  );
};

export default DaysLeft;
