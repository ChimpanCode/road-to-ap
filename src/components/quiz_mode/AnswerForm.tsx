import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  checkAnswer: () => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const AnswerForm = ({ userAnswer, setUserAnswer, checkAnswer, isLoading, inputRef }: Props) => (
  <div className="mt-8 flex items-center space-x-2">
    {/* ユーザーの回答入力フィールド */}
    <TextField
      label="あなたの回答"
      variant="outlined"
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      disabled={isLoading}
      size="medium"
      style={{ minWidth: 240 }}
      inputRef={inputRef} // 入力フィールドの参照を設定
      onKeyDown={(e) => {
        if (
          e.key === "Enter" &&
          !isLoading &&
          userAnswer.trim() !== ""
        ) {
          checkAnswer();
        }
      }}
    />
    {/* 送信ボタン */}
    <IconButton
      color="primary"
      onClick={checkAnswer}
      disabled={isLoading || !userAnswer}
      style={{
        height: 40,
        width: 40,
        marginLeft: 4,
        marginTop: 7,
        border: "1px solid #1976d2",
        background: "#f5faff",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <SendIcon style={{ fontSize: 28, verticalAlign: "middle" }} />
    </IconButton>
  </div>
);

export default AnswerForm;