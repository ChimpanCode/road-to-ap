type Props = {
  spokenText: string;
};

const SpokenTextDisplay = ({ spokenText }: Props) => {
  return (
    <div>
    {/* 音声認識結果の表示 */}
      {spokenText && (
        <div
          className="class=border-2 border-[#1976d2] rounded-lg p-4 mx-auto max-w-lg bg-[#f5faff] text-[#222] break-all"
        >
          <div>{spokenText}</div>
        </div>
      )}
    </div>
  )
}

export default SpokenTextDisplay