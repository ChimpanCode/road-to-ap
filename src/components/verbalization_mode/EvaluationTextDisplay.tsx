import { Paper, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';

type Props = {
  evaluationText: string;
};

const EvaluationTextDisplay = ({ evaluationText }: Props) => {
  // テキストを点数と評価理由に分割
  const [score, reason] = evaluationText
    ? evaluationText.split(')(').map(part => part.replace(/[()]/g, '').trim())
    : ['-', ''];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        height: 400, // 固定高さを設定
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 点数表示 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
          height: 60,
        }}
      >
        {evaluationText ? (
          <>
            <Typography
              variant="h3"
              sx={{
                color: '#1976d2',
                fontWeight: 'bold',
                fontSize: '2.5rem',
              }}
            >
              {score}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                ml: 1,
              }}
            >
              点
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="h3"
              sx={{
                color: '#999',
                fontWeight: 'bold',
                fontSize: '2.5rem',
              }}
            >
              -
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#999',
                ml: 1,
              }}
            >
              点
            </Typography>
          </>
        )}
      </Box>

      {/* 評価理由 */}
      <Box
        sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          flex: 1, // 残りのスペースを埋める
          overflowY: 'auto', // スクロール可能に
        }}
      >
        {evaluationText ? (
          <Typography
            variant="body1"
            sx={{
              color: '#333',
              lineHeight: 1.8,
              fontSize: '1rem',
              whiteSpace: 'pre-wrap',
            }}
          >
            <ReactMarkdown>{reason}</ReactMarkdown>
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: '#999',
              fontStyle: 'italic',
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            判定ボタンを押すと評価が表示されます
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default EvaluationTextDisplay;