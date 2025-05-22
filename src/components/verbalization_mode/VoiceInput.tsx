import { useState, useRef, useEffect } from 'react';
// 外部関数のインポート
import { startGeminiVoice } from '../../utils/gemini';

const VoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false); // 録音中かどうかの状態
  const [audioURL, setAudioURL] = useState<string | null>(null); // 録音した音声のURL
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]); // 利用可能なデバイスリスト
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null); // 選択されたデバイスID
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // MediaRecorderの参照

  const [spokenText, setSpokenText] = useState('認識テキスト');// 音声認識したテキストを格納するためのuseState

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // 追加: 録音したBlobを保存するstate

  // 利用可能なデバイスを取得
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

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' }); // 音声データをBlobとして保存
        setAudioBlob(audioBlob); // stateに保存
        const audioURL = URL.createObjectURL(audioBlob); // BlobをURLに変換
        setAudioURL(audioURL); // URLを状態に保存
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

  // 録音した音声データをGeminiAPIに文字起こししてもらう
  const sendAudioToGeminiAPI = async () => {
    if (!audioBlob) return; // 録音した音声データが存在する場合のみ実行
    const text = await startGeminiVoice(audioBlob);
    setSpokenText(text); // 文字起こし結果をstateに保存
  
};

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">指定の用語について音声で説明してください:</h2>
      <h2 className="text-xl font-bold mb-4">MACアドレス</h2>

      {/* マイク選択ドロップダウン */}
      <div className="mb-4">
        <label htmlFor="device-select" className="block mb-2 font-bold">
          使用するマイクを選択:
        </label>
        <select
          id="device-select"
          value={selectedDeviceId || ''}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `マイク ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>

      {/* 録音ボタン */}
      {isRecording ? (
        <button
          onClick={handleStopRecording}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          録音停止
        </button>
      ) : (
        <button
          onClick={handleStartRecording}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          録音開始
        </button>
      )}

      {/* 録音した音声の再生とダウンロード */}
      {audioURL && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">録音した音声:</h3>
          <audio controls src={audioURL}></audio>
          <a
            href={audioURL}
            download="recording.webm"
            className="block mt-2 text-blue-500 underline"
          >
            音声をダウンロード
          </a>
        </div>
      )}
      {/* 録音した音声の文字起こし開始 */}
      {audioBlob && (<button
          onClick={sendAudioToGeminiAPI}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          文字起こし開始
        </button>)}
      <h2 className="text-xl font-bold mb-4">{spokenText}</h2>
    </div>
  );
};

export default VoiceInput;