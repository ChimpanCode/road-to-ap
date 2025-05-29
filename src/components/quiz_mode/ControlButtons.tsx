import Button from "@mui/material/Button";

type Props = {
  endQuiz: () => void;
  generateQuiz: () => void;
  isLoading: boolean;
};

const ControlButtons = ({ endQuiz, generateQuiz, isLoading }: Props) => (
  <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
    {/* クイズを終了するボタン */}
    <Button
      variant="outlined"
      color="secondary"
      onClick={endQuiz}
      style={{ minWidth: 120, fontWeight: "bold" }}
      disabled={isLoading}
    >
      クイズを終了
    </Button>
    {/* 次の問題へボタン */}
    <Button
      variant="contained"
      color="primary"
      onClick={generateQuiz}
      style={{ minWidth: 200, fontWeight: "bold", fontSize: "1.1em" }}
      disabled={isLoading}
    >
      次の問題へ
    </Button>
  </div>
);

export default ControlButtons;