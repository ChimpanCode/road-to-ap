type Props = {
  spokenText: string;
};

const SpokenTextDisplay = ({ spokenText }: Props) => (
  <div
    style={{
      border: "2px solid #1976d2",
      borderRadius: "8px",
      padding: "16px",
      margin: "24px auto",
      maxWidth: "500px",
      background: "#f5faff",
      color: "#222",
      wordBreak: "break-all"
    }}
  >
    <div>{spokenText}</div>
  </div>
);

export default SpokenTextDisplay;