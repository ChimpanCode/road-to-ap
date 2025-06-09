import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

type Props = {
  onEvaluate: () => void;
  disabled: boolean;
};

const EvaluationButton = ({ onEvaluate, disabled }: Props) => (
  <Tooltip title="回答を評価">
    <Button
      onClick={onEvaluate}
      variant="contained"
      color="primary"
      disabled={disabled}
      sx={{
        width: '60%',
        height: 40,
        borderRadius: 2,
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
          boxShadow: 4,
        },
        boxShadow: 2,
      }}
    >
      判定
    </Button>
  </Tooltip>
);

export default EvaluationButton; 