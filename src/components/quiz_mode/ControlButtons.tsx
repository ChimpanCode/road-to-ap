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
  <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
    {/* 終了ボタン */}
    <Button
      variant="outlined"
      color="secondary"
      onClick={endAction}
      style={{ minWidth: 120, fontWeight: "bold" }}
      disabled={isLoading}
    >
      {endButtonText}
    </Button>
    {/* 次の問題へボタン */}
    <Button
      variant="contained"
      color="primary"
      onClick={nextAction}
      style={{ minWidth: 200, fontWeight: "bold", fontSize: "1.1em" }}
      disabled={isLoading}
    >
      {nextButtonText}
    </Button>
  </div>
);

export default ControlButtons;