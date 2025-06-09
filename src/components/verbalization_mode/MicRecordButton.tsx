import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import Tooltip from '@mui/material/Tooltip';

type Props = {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
};

const MicRecordButton = ({ isRecording, onStartRecording, onStopRecording }: Props) => (
  <Tooltip title={isRecording ? "録音を停止" : "録音を開始"}>
    <Button
      onClick={isRecording ? onStopRecording : onStartRecording}
      variant="contained"
      color={isRecording ? "error" : "primary"}
      sx={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        minWidth: 'unset',
        padding: 0,
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
          boxShadow: 4,
        },
        boxShadow: 2,
      }}
    >
      {isRecording ? <StopIcon sx={{ fontSize: 32 }} /> : <MicIcon sx={{ fontSize: 32 }} />}
    </Button>
  </Tooltip>
);

export default MicRecordButton;