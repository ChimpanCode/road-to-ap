/**
 * モードの終了と次の問題への遷移を制御するボタンコンポーネント
 * クイズモードや音声入力モードなど、複数のモードで共通して使用される
 * 
 * @component
 * @param {Object} props - コンポーネントのプロパティ
 * @param {() => void} props.endAction - モードを終了するためのコールバック関数
 * @param {() => void} props.nextAction - 次の問題に進むためのコールバック関数
 * @param {boolean} props.isLoading - アクション実行中かどうかを示すフラグ
 * @param {string} [props.endButtonText="終了"] - 終了ボタンのテキスト
 * @param {string} [props.nextButtonText="次の問題へ"] - 次の問題へボタンのテキスト
 * @returns {JSX.Element} 制御ボタンコンポーネント
 */
import Button from "@mui/material/Button";

type Props = {
  endAction: () => void;
  nextAction: () => void;
  isLoading: boolean;
  endButtonText?: string;
  nextButtonText?: string;
};

const ControlButtons = ({ 
  endAction, 
  nextAction, 
  isLoading,
  endButtonText = "終了",
  nextButtonText = "次の問題へ"
}: Props) => (
  <div className="w-full flex justify-center gap-4 mt-6">
    {/* 終了ボタン */}
    <Button
      variant="outlined"
      color="secondary"
      onClick={endAction}
      disabled={isLoading}
      className="min-w-[120px] font-bold text-sm"
    >
      {endButtonText}
    </Button>
    {/* 次の問題へボタン */}
    <Button
      variant="contained"
      color="primary"
      onClick={nextAction}
      disabled={isLoading}
      className="min-w-[200px] font-bold text-sm"
    >
      {nextButtonText}
    </Button>
  </div>
);

export default ControlButtons;