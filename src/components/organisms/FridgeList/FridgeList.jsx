import { Button, List, ListItem, Stack, Typography } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarIcon,
  Instagram as InstagramIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material';

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { formatDate } from 'lib/helperFunctions';
import { getInstagramHandleFromUrl } from 'lib/helperFunctions';
import typesValidation from 'schema/api/fridge/prop-types';
import { useMemo } from 'react';

function indexReportsByFridgeId(reports) {
  const ret = {};
  for (const report of reports) {
    ret[report.fridgeId] = report;
  }
  return ret;
}

function Location({ location }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <LocationOnOutlinedIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        {`${location.street} ${location.city}, ${location.state} ${location.zip}`}
      </Typography>
    </Stack>
  );
}
Location.propTypes = {
  location: PropTypes.object.isRequired,
};

function Instagram({ instagramUrl }) {
  const handle = getInstagramHandleFromUrl(instagramUrl);
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <InstagramIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        @{handle}
      </Typography>
    </Stack>
  );
}
Instagram.propTypes = {
  instagramUrl: PropTypes.string.isRequired,
};

function LastUpdate({ date }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <CalendarIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        Last Update: {formatDate(date)}
      </Typography>
    </Stack>
  );
}
LastUpdate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default function FridgeList({ fridges, reports }) {
  const reportDict = useMemo(() => indexReportsByFridgeId(reports), [reports]);

  return (
    <List>
      {fridges.map((fridge, fridgeIndex) => (
        <ListItem
          key={fridge.id}
          divider={fridgeIndex !== fridges.length - 1}
          sx={{ paddingY: 5.5, paddingX: 0 }}
        >
          <Stack direction="column" spacing={3} width="100%">
            <Stack direction="row" spacing={3}>
              <Stack direction="column" spacing={3} flex={1}>
                <Typography sx={{ fontSize: ['1rem'], fontWeight: 700 }}>
                  {fridge.name}
                </Typography>
                <Location location={fridge.location} />
                {fridge.maintainer?.instagram ? (
                  <Instagram instagramUrl={fridge.maintainer.instagram} />
                ) : null}
                {reportDict[fridge.id] ? (
                  <LastUpdate date={reportDict[fridge.id].timestamp} />
                ) : null}
              </Stack>
              {fridge.photoUrl ? (
                <Stack flex={1}>
                  <Image
                    src={fridge.photoUrl}
                    alt="Picture of the fridge"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                  />
                </Stack>
              ) : null}
            </Stack>
            <Button
              href={`/fridge/${fridge.id}`}
              component="a"
              LinkComponent={Link}
              variant="contained"
              sx={{ fontSize: ['1rem'] }}
            >
              More Info
            </Button>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
FridgeList.propTypes = {
  fridges: PropTypes.arrayOf(typesValidation.Fridge),
  reports: PropTypes.arrayOf(typesValidation.Report),
};
