import ReactMarkdown from "react-markdown";

type Props = {
  questionText: string;
  isLoading: boolean;
};

const QuestionDisplay = ({ questionText, isLoading }: Props) => (
  <div
    className="flex justify-center items-center font-bold text-3xl w-3/4 h-1/3 mt-20 bg-white rounded-lg shadow-lg p-4"
    style={{
      border: "2px solid #1976d2",
      borderRadius: "12px",
      background: "#f5faff",
      minHeight: "120px",
      marginBottom: "16px",
    }}
  >
    {isLoading ? <p>生成中...</p> : <ReactMarkdown>{questionText}</ReactMarkdown>}
  </div>
);

export default QuestionDisplay;