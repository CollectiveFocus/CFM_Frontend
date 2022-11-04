import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { PageFooter } from 'components/atoms';

const panelList = [
  {
    title: 'Bringing Food to Fridges',
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
    title: 'Taking Food from Fridges',
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

function TabPanel(props) {
  const { children, currentTab, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={currentTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{ mx: 4 }}
      {...other}
    >
      <Box
        sx={{
          '& ol': {
            paddingLeft: 6,
            paddingRight: 7,
            marginBottom: 12,
          },
        }}
      >
        <ol>{children}</ol>
      </Box>
    </Box>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  currentTab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default function BestPracticesPage() {
  const [ixCurrentPanel, setCurrentPanelIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentPanelIndex(newValue);
  };

  return (
    <>
      <Head>
        <title>Fridge Finder: Best Practices</title>
      </Head>
      <Typography sx={{ ml: 4 }} variant="h1">
        Best Practices
      </Typography>
      <Tabs
        sx={{ mx: 4 }}
        value={ixCurrentPanel}
        onChange={handleChange}
        aria-label="Community Fridge Best Practices"
        variant="fullWidth"
        textColor="primary"
      >
        {panelList.map((panel, index) => (
          <Tab
            key={'tab-title-' + panel.title}
            label={panel.title}
            sx={{ textTransform: 'none', paddingTop: 0 }}
            id={'tab-' + index}
            aria-controls={'tab-panel-' + index}
          />
        ))}
      </Tabs>
      {panelList.map((panel, ixPanel) => (
        <TabPanel
          key={`tab-panel-${ixPanel}`}
          currentTab={ixCurrentPanel}
          index={ixPanel}
        >
          {panel.content.map((item, ixContent) => (
            <li key={`tab-content-${ixPanel}-${ixContent}`}>
              <Typography>{item}</Typography>
            </li>
          ))}
        </TabPanel>
      ))}

      <PageFooter fixedAtBottom={true} />
    </>
  );
}
