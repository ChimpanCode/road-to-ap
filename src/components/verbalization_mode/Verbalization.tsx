import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import MicSelector from './MicSelector';
import VerbalizationGenerator from './VerbalizationGenerator'


type Props = {
  answerWordList: string[];
};

const Verbalization = ({answerWordList}: Props) => {
  //const [answerWordList, setAnswerWordList] = useState<string[]>([]); // クイズの解答となる用語の候補リスト
  //用語クイズが開始されているかどうかを管理するuseState
  const [isVerbalizationStarted, setIsVerbalizationStarted] = useState(false); // 言語化モード開始状態を管理するuseState

  // マイクデバイス管理用のstateを追加
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

 

  //言語化モードを開始する関数
  const startVerbalization = () => { 
    setIsVerbalizationStarted(true); // 言語化モード開始状態をtrueにする
    //callGemini(); // Gemini APIを呼び出して言語化を生成
  }

  //言語化モードを終了する関数
  const endVerbalization = () => {  
    setIsVerbalizationStarted(false);
    // 結果の保存や状態リセットなど
  } 


   // 利用可能なマイクデバイスを取得
  //コンポーネントが初めてレンダリングされたときにのみ実行されるようにuseEffectの第二引数に空の配列を渡している
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // マイクの許可を取得
        await navigator.mediaDevices.getUserMedia({ audio: true });

        // ユーザーのマイクデバイス一覧を取得
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = deviceList.filter(device => device.kind === 'audioinput');
        setDevices(audioInputDevices);

        if (audioInputDevices.length > 0) {
          setSelectedDeviceId(audioInputDevices[0].deviceId); // デフォルトで最初のデバイスを選択
        }
      } catch (error) {
        console.error('マイクの許可が得られませんでした:', error);
      }
    };

    fetchDevices();
  }, []);


  return (
    <>
      {!isVerbalizationStarted ? (
        <div>
          {/* 言語化モード開始前の画面内容 */}
          <p className="max-w-xl mx-auto mt-8 mb-6 bg-blue-50 rounded-xl px-6 py-5 text-center text-base text-gray-800 font-medium shadow">
            このモードでは、IT用語を自分の音声で説明し、どれくらい説明できているかをAIが判定します
          </p>

          {/* マイク選択ドロップダウン */}
          <MicSelector
            devices={devices}
            selectedDeviceId={selectedDeviceId}
            setSelectedDeviceId={setSelectedDeviceId} 
          />

          {/*  言語化モード開始ボタン */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={startVerbalization}
              style={{ minWidth: 160, fontWeight: "bold" }}
            >
              言語化モードを開始
            </Button>
          </div>

        </div>
      ) : (
        <div>
          {/* 言語化モードの画面内容 */}
          <VerbalizationGenerator answerWordList={answerWordList} selectedDeviceId={selectedDeviceId} endVerbalization={endVerbalization} />
        </div>
      )}
    </>
  )
}

export default Verbalization