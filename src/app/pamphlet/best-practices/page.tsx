import React from 'react';
import { Metadata } from 'next';
import { Box, Typography } from '@mui/material';

const practices = [
  {
    title: 'Dropping off',
    content: [
      'Only bring good food to the community fridges. When considering what is good to donate, ask yourself if you would give the food item to your friends or family to eat? If so, your food donation is probably good for your neighbors, too.',
      'Food must be fresh, stored at the proper temperature, and unexpired.',
      'Portion donations into individual sized quantities that make it easy for people to take with them. Catering trays should not be stored in community fridges due to causing food contents to spill, and being inaccessible for the public to transport.',
      'Food should be kept in clean, airtight containers to avoid food spills.',
      'Label meals with ingredients and the date prepared.',
      'If you notice a fridge needs to be cleaned, help clean it.',
      'Do not bring anything else that is not food to a community fridge, unless told otherwise.',
      'Take your trash with you, including cardboard boxes and food scraps.',
    ],
  },
  {
    title: 'Picking up',
    content: [
      'Only take the amount of food that you need, and leave the rest for others. Many people depend on community fridges to get enough nutrition. Whenever possible, make sure there is enough food left for others to eat as well.',
      'Only take good food from the fridges. If the food does not look good, throw it away using appropriate procedures and sanitation.',
      'If you touch a food item, take it with you or throw it away.',
      'Do not leave trash near community fridges.',
      'If you notice a fridge needs to be cleaned, help clean it.',
      'Be kind to others when interacting with community fridges.',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Fridge Finder: Best Practices',
};

export default function BestPracticesPage(): React.ReactElement {
  return (
    <>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 8, md: 12 },
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 10, maxWidth: 700, mx: 'auto' }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              mb: 2,
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            COMMUNITY GUIDELINES
          </Typography>
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'text.primary',
            }}
          >
            Best Practices
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.25rem',
              lineHeight: 1.6,
            }}
          >
            Please follow these guidelines when interacting with community
            fridges to keep them safe, clean, and accessible to everyone in the
            neighborhood.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 8, md: 10 },
          }}
        >
          {practices.map((section, index) => (
            <Box
              key={index}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 6 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'text.primary',
                    m: 0,
                  }}
                >
                  {section.title}
                </Typography>
              </Box>

              <Box
                component="ul"
                sx={{ listStyle: 'none', p: 0, m: 0, flexGrow: 1 }}
              >
                {section.content.map((item, i) => (
                  <Box
                    component="li"
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 4,
                      position: 'relative',
                      pl: 5,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 10,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.primary',
                        fontSize: '1.05rem',
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
