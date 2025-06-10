import { useState, useRef, useEffect } from 'react';
// 外部関数のインポート
import { transcribeAudioWithGemini, evaluateTextWithGemini } from '../../utils/gemini';
import { pickRandomWord } from '../../utils/common';

import Box from '@mui/material/Box';
// コンポーネントのインポート
import MicRecordButton from './MicRecordButton';
import EvaluationButton from './EvaluationButton';
import SpokenTextDisplay from './SpokenTextDisplay';
import EvaluationTextDisplay from './EvaluationTextDisplay';
import ControlButtons from '../common/ControlButtons';

type VoiceInputProps = {
  answerWordList: string[];
  selectedDeviceId: string | null;
  endVerbalization: () => void;
};

const VerbalizationGenerator = ({ answerWordList, selectedDeviceId, endVerbalization }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false); // 録音中かどうかの状態
  //onst [audioURL, setAudioURL] = useState<string | null>(null); // 録音した音声のURL
  //const [devices, setDevices] = useState<MediaDeviceInfo[]>([]); // 利用可能なデバイスリスト
  //const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null); // 選択されたデバイスID
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // MediaRecorderの参照

  const [spokenText, setSpokenText] = useState('');// 音声認識したテキストを格納するためのuseState

  const [evaluationText, setEvalutionText] = useState(''); // 言語化した内容に対する評価を格納するためのuseState

  //const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // 録音したBlobを保存するstate

  const [targetWord, setTagetWord] = useState(''); // 言語化の対象となる用語を格納するためのuseState

  const [isLoading, setIsLoading] = useState(false); // クイズ生成中のローディング状態を管理するuseState

  

  // 録音開始ボタンがクリックされたときの処理 Blobオブジェクトを作成して音声データを保存する
  const handleStartRecording = async () => {
    try {
      // 選択されたデバイスを使用してストリームを取得
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedDeviceId || undefined },
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data); // 音声データを収集
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' }); // 音声データをBlobとして保存
        //setAudioBlob(audioBlob); // stateに保存
        // 録音が停止されたら音声データをGeminiAPIに送信して文字起こしのみ実行
        const text = await transcribeAudioWithGemini(audioBlob);
        setSpokenText(text);
      };

      mediaRecorder.start(); // 録音開始
      setIsRecording(true);
    } catch (error) {
      console.error('マイクの許可が得られませんでした:', error);
    }
  };

  // 録音停止ボタンがクリックされたときの処理
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // 録音停止
      setIsRecording(false);
    }
  };

  // 録音した音声データをGeminiAPIに文字起こししてもらい、評価を受ける関数
  const sendAudioToGeminiAPI = async () => {
    if (!spokenText) return;
    
    setIsLoading(true);
    try {
      const evaluation = await evaluateTextWithGemini(spokenText, targetWord);
      setEvalutionText(evaluation);
    } catch (error) {
      console.error('評価中にエラーが発生しました:', error);
    } finally {
      setIsLoading(false);
    }
  }; 

  //録音した音声データをGeminiAPIに文字起こししてもらう関数


  //言語化問題を一問生成しステートに保存する関数
  const generateVerbalizationQuestion = () => {
    const word = pickRandomWord(answerWordList); // 候補からランダムに選ばれた用語を取得
    setTagetWord(word); // 言語化の対象となる用語をstateにセット
    setSpokenText(''); // 前の問題の文字起こし結果をクリア
    //setAudioURL(null); // 前の問題の音声URLをクリア
    //setAudioBlob(null); // 前の問題の音声Blobをクリア
    setEvalutionText(''); // 前の問題の評価をクリア
  };

  //クイズスタート時に一問目を生成するためのuseEffect
  useEffect(() => {
  if (answerWordList.length > 0) {
    generateVerbalizationQuestion();
  }
  }, [answerWordList]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className="flex justify-center items-center font-bold text-3xl w-3/4 h-1/3 mt-20 
              bg-white rounded-lg shadow-lg p-4
              border-2 border-[#1976d2] rounded-xl bg-[#f5faff] min-h-[80px] mb-4"
      >
        <h2 className="text-xl font-bold mb-4">{targetWord} について音声で説明してください</h2>
      </div>

      {/* 録音ボタン */}
      <MicRecordButton 
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />

      {/* 3カラムレイアウト */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: 1200,
          mt: 4,
          gap: 4,
          px: 2,
          alignItems: 'center',
        }}
      >
        {/* 左カラム：音声認識結果 */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <SpokenTextDisplay spokenText={spokenText} />
        </Box>

        {/* 中央カラム：評価ボタン */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 200,
          }}
        >
          <EvaluationButton
            onEvaluate={sendAudioToGeminiAPI}
            disabled={!spokenText}
          />
        </Box>

        {/* 右カラム：評価結果 */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <EvaluationTextDisplay evaluationText={evaluationText} />
        </Box>
      </Box>

      {/* ボタンコンポーネント */}
      <ControlButtons
        endAction={endVerbalization}
        nextAction={generateVerbalizationQuestion}
        isLoading={isLoading}
        endButtonText="言語化モードを終了"
        nextButtonText="次の問題へ"
      />
    </div>
  );
};

export default VerbalizationGenerator;