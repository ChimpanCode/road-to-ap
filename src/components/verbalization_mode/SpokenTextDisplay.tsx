import { Paper, Typography, Box } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

type Props = {
  spokenText: string;
};

const SpokenTextDisplay = ({ spokenText }: Props) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          position: 'relative',
          backgroundColor: '#f8f9fa',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          height: 400, // 固定高さを設定
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 引用アイコン */}
        <FormatQuoteIcon
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: '#1976d2',
            opacity: 0.2,
            fontSize: 40,
          }}
        />
        
        {/* テキストコンテンツ */}
        {spokenText ? (
          <Typography
            variant="body1"
            sx={{
              pl: 4,
              pr: 2,
              lineHeight: 1.8,
              fontSize: '1.1rem',
              color: '#333',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowY: 'auto', // スクロール可能に
              flex: 1, // 残りのスペースを埋める
            }}
          >
            {spokenText}
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              pl: 4,
              pr: 2,
              color: '#999',
              fontStyle: 'italic',
              textAlign: 'center',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            音声認識結果がここに表示されます
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default SpokenTextDisplay;