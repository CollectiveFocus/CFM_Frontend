import { Container, Box } from '@mui/system';
import { Typography } from '@mui/material';

import InfoCard from '../InfoCard';

const data = [
  {
    imgSrc: '/mascot/apple.svg',
    altText: 'Picture of smiling apple holding a list',
    title: 'Read Best Practices',
    text: 'Please look over the guidelines for food donation best practices to keep our fridges safe and accessible to all.',
  },
  {
    imgSrc: '/mascot/jumpingBlueberries.svg',
    altText: 'Picture of blueberries jumping and waving',
    title: 'Volunteer',
    text: 'There are many ways to volunteer to help out the fridges, from driving, bringing food to fridges, or hostin a fridge.',
  },
  {
    imgSrc: '/mascot/pearAndFridge.svg',
    altText: 'Picture of smiling pear and smiling fridge',
    title: 'Host A Fridge',
    text: 'Please look over the guidelines for food donation best practices to keep our fridges safe and accessible to all.',
  },
];

const GetInvolved = ({}) => {
  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: '1.5rem',
          mb: {
            xs: 3,
            lg: 10,
          },
        }}
        textAlign="center"
      >
        Get involved with NYC community fridges!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
          justifyContent: {
            xs: 'center',
            md: 'space-between',
          },
          xs: {
            px: 8,
          },
        }}
      >
        {data.map((card) => {
          const { imgSrc, altText, title, text, buttonTitle } = card;

          return (
            <InfoCard
              key={`${imgSrc}`}
              imgSrc={imgSrc}
              altText={altText}
              title={title}
              text={text}
              buttonTitle={buttonTitle}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default GetInvolved;
