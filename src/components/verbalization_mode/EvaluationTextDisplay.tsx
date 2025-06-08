import ReactMarkdown from 'react-markdown';

type Props = {
  evaluationText: string;
};

const EvaluationTextDisplay = ({ evaluationText }: Props) => {


  // テキストを点数と評価理由に分割
  const [score, reason] = evaluationText.split(')(').map(part => part.replace(/[()]/g, '').trim());
  //console.log(`Score: ${score}, Reason: ${reason}`); // デバッグ用のログ
  return (
    <>
        <div className="text-5xl font-bold text-black-700 mb-4 text-center">
            {score}
        </div>
      <div className="prose max-w-none text-gray-800 leading-relaxed">
        <ReactMarkdown>{reason}</ReactMarkdown>
      </div>
    </>
  )
}

export default EvaluationTextDisplay