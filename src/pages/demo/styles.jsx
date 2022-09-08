import PropTypes from 'prop-types';
import Head from 'next/head';
import { Stack, Typography } from '@mui/material';

export async function getStaticProps() {
  return {
    props: {
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim corrupti
      soluta cum, facere ut alias quae quidem autem minima ad sunt, eum
      tempore, nobis odit beatae? Repudiandae saepe voluptates nihil?`,
      listItems: [`Lorem`, `ipsum`, `dolor`],
    },
  };
}

export default function DemoStylesPage({ text, listItems }) {
  return (
    <>
      <Head>
        <title>CFM: Theme Styles Demo</title>
      </Head>

      <Stack gap={4} p={4}>
        <Typography sx={{ fontWeight: 'bold' }}>
          Bold
          <br />
          {text}
        </Typography>
        <Typography sx={{ fontStyle: 'italic' }}>
          Italic
          <br />
          {text}
        </Typography>
        <Typography>
          Subscript
          <br />
          Lorem ipsum dolor <sub>sit amet</sub> consectetur adipisicing elit.
        </Typography>
        <Typography>
          Superscript
          <br />
          Lorem ipsum dolor <sup>sit amet</sup> consectetur adipisicing elit.
        </Typography>
        <Stack>
          Blockquote
          <blockquote>{text}</blockquote>
        </Stack>
        <Stack>
          ul
          <ul>
            {listItems.map((item, i) => (
              <li key={'ul' + i}>{item}</li>
            ))}
          </ul>
        </Stack>
        <Stack>
          ol
          <ol>
            {listItems.map((item, i) => (
              <li key={'ol' + i}>{item}</li>
            ))}
          </ol>
        </Stack>
        <Typography variant="caption">
          Typography caption
          <br />
          {text}
        </Typography>
        <Typography variant="subtitle1">
          Typography subtitle1
          <br />
          {text}
        </Typography>
        <Typography variant="subtitle2">
          Typography subtitle2
          <br />
          {text}
        </Typography>
      </Stack>
    </>
  );
}
DemoStylesPage.propTypes = PropTypes.exact({
  text: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;
