import React from 'react';
import { Metadata } from 'next';
import { Box, Typography, Paper } from '@mui/material';

import { CheckCircleOutline as CheckIcon } from '@mui/icons-material';

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
          maxWidth: 900,
          mx: 'auto',
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 6, md: 10 },
          width: '100%',
        }}
      >
        <Typography variant="h1" sx={{ textAlign: 'center', mb: 2 }}>
          Best Practices
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 8,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Please follow these guidelines when interacting with community fridges
          to keep them safe, clean, and accessible to everyone in the
          neighborhood.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {practices.map((section, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.05)',
                backgroundColor: 'background.paper',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 4,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'text.primary',
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.content.map((item, i) => (
                  <Box
                    component="li"
                    key={i}
                    sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}
                  >
                    <CheckIcon
                      sx={{
                        color: 'primary.main',
                        mr: 2,
                        mt: 0.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
}
