import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

type Props = {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
};

const MicRecordButton = ({ isRecording, onStartRecording, onStopRecording }: Props) => (
  <Button
    onClick={isRecording ? onStopRecording : onStartRecording}
    variant="contained"
    color={isRecording ? "error" : "primary"}
    style={{ minWidth: 56, minHeight: 56, borderRadius: "50%" }}
  >
    {isRecording ? <StopIcon fontSize="large" /> : <MicIcon fontSize="large" />}
  </Button>
);

export default MicRecordButton;