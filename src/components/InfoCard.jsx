import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';

const InfoCard = ({ imgSrc, altText, title, text, buttonTitle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        mx: 4,
      }}
    >
      <Box sx={{ mb: 4, display: 'block' }}>
        <Image
          className="svgImage"
          src={imgSrc}
          width={365}
          height={185}
          alt={altText}
        />
      </Box>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          fontSize: '1.15rem',
          fontWeight: 700,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        sx={{
          color: 'rgba(34, 34, 34, 0.8)',
          fontSize: '1.15rem',
          mb: 3,
          display: 'inline-block',
          flexGrow: 1,
          fledDirection: 'column',
        }}
      >
        {text}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderRadius: 45,
          fontWeight: 700,
          color: '#222222',
          backgroundColor: 'white',
          borderColor: '#1543D4',
          border: '2px solid #1543D4',
          mb: 8,
          minWidth: 337,
          '&:hover': {
            border: '2px solid #1543D4',
          },
        }}
      >
        {buttonTitle || 'LEARN MORE'}
      </Button>
    </Box>
  );
};

export default InfoCard;
