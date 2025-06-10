/**
 * クイズの問題文を表示するコンポーネント
 * 
 * @component
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.questionText - 表示する問題文（Markdown形式）
 * @param {boolean} props.isLoading - 問題文の生成中かどうかを示すフラグ
 * @returns {JSX.Element} 問題文を表示するコンポーネント
 */
import ReactMarkdown from "react-markdown";

type Props = {
  questionText: string;
  isLoading: boolean;
};

const QuestionDisplay = ({ questionText, isLoading }: Props) => (
  // 問題文のコンテナ
  // 生成中状態と問題文表示状態で異なる内容を表示
  <div className="flex justify-center items-center w-3/4 mt-20 bg-[#f5faff] rounded-xl p-4 min-h-[120px] mb-4 border-2 border-[#1976d2] shadow-lg">
    {isLoading ? (
      <p className="text-lg">生成中...</p>
    ) : (
      <div className="text-lg">
        <ReactMarkdown>{questionText}</ReactMarkdown>
      </div>
    )}
  </div>
);

export default QuestionDisplay;