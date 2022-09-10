import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@mui/material';
import { ButtonLink, DecoratedParagraph, PageFooter } from 'components/atoms';

export async function getStaticProps() {
  return {
    props: {
      content: [
        {
          title: 'Start a Fridge',
          variant: 'h1',
          body: 'Vitae, eu aliquam aenean magnis adipiscing quis mauris. A, dis nisi at suscipit gravida. Et sem r ut mauris sed. Mauris id odio in nec. Volutpat.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: '1. Form Your Team',
          variant: 'h2',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus porttitor facilisis dolor viverra pellentesque mauris velit. Facilisis senectus id tincidunt feugiat tellus quis. At suspendisse pharetra, ut pellentesque vitae. Platea cursus venenatis scelerisque sit orci ullamcorper gravida condimentum. At tempus, dolor, metus enim tempor adipiscing convallis. Vitae odio feugiat vivamus mauris porttitor. Dictum in egestas mauris, nibh ipsum phasellus sit. Ultrices iaculis diam metus, mattis aliquet in amet pellentesque.\nInteger aliquam aliquet odio volutpat. Massa eu aliquam leo eu in. Quis etiam dapibus venenatis scelerisque. Vulputate eu a enim nunc, massa nisl sed neque dignissim. Auctor orci imperdiet sit egestas egestas. Condimentum non cum nunc, morbi ullamcorper. Egestas tempus quam sapien vitae est. Nisl quis.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: '2. Find a Location',
          variant: 'h2',
          body: 'Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Lacus porttitor facilisis dolor viverra pellentesque mauris velit. Facilisis senectus id tincidunt feugiat tellus quis. At suspendisse pharetra, ut pellentesque vitae. Platea cursus venenatis scelerisque sit orci ullamcorper gravida condimentum. At tempus, dolor, metus enim tempor adipiscing convallis. Vitae odio feugiat vivamus mauris porttitor. Dictum in egestas mauris, nibh ipsum phasellus sit. Ultrices iaculis diam metus, mattis aliquet in amet pellentesque.\nInteger aliquam aliquet odio volutpat. Massa eu aliquam leo eu in. Quis etiam dapibus venenatis scelerisque. Vulputate eu a enim nunc, massa nisl sed neque dignissim. Auctor orci imperdiet sit egestas egestas. Condimentum non cum nunc, morbi ullamcorper. Egestas tempus quam sapien vitae est. Nisl quis.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: '3. Build a Shed',
          variant: 'h2',
          body: 'Integer aliquam aliquet odio volutpat. Massa eu aliquam leo eu in. Quis etiam dapibus venenatis scelerisque. Vulputate eu a enim nunc, massa nisl sed neque dignissim. Auctor orci imperdiet sit egestas egestas. Condimentum non cum nunc, morbi ullamcorper. Egestas tempus quam sapien vitae est. Nisl quis.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: '4. Budgeting Tips',
          variant: 'h2',
          body: 'Integer aliquam aliquet odio volutpat. Massa eu aliquam leo eu in. Quis etiam dapibus venenatis scelerisque. Vulputate eu a enim nunc, massa nisl sed neque dignissim. Auctor orci imperdiet sit egestas egestas. Condimentum non cum nunc, morbi ullamcorper. Egestas tempus quam sapien vitae est. Nisl quis.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: '5. Legal Concerns',
          variant: 'h2',
          body: 'Integer aliquam aliquet odio volutpat. Massa eu aliquam leo eu in. Quis etiam dapibus venenatis scelerisque. Vulputate eu a enim nunc, massa nisl sed neque dignissim. Auctor orci imperdiet sit egestas egestas. Condimentum non cum nunc, morbi ullamcorper. Egestas tempus quam sapien vitae est. Nisl quis.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: '6. Spread the Word!',
          variant: 'h2',
          body: 'Integer aliquam aliquet odio volutpat. Massa eu aliquam leo eu in. Quis etiam dapibus venenatis scelerisque. Vulputate eu a enim nunc, massa nisl sed neque dignissim. Auctor orci imperdiet sit egestas egestas. Condimentum non cum nunc, morbi ullamcorper. Egestas tempus quam sapien vitae est. Nisl quis.',
        },
        {
          title: '7. Ready to Add Your Fridge?',
          variant: 'h2',
          body: 'Add your fridge to the Community Fridge Map by clicking the button below and completing a short form.',
        },
      ],
    },
  };
} // getStaticProps()

export default function StartAFridgePage({ content }) {
  const headerImg = {
    src: '/img/hero.webp',
    alt: 'stand in hero img',
    width: 375,
    height: 390,
  };
  return (
    <>
      <Head>
        <title>CFM: Start a Fridge</title>
      </Head>
      <Box textAlign="center">
        <Image {...headerImg} alt={headerImg.alt} />
      </Box>
      <Box mx={3} mt={12}>
        {content.map((para, index) => (
          <DecoratedParagraph
            {...para}
            key={para.title}
            hasDivider={index > 0}
          />
        ))}
      </Box>
      <Box textAlign="center">
        <ButtonLink
          variant="contained"
          sx={{ my: 7, minWidth: 345 }}
          to="/user/add-fridge"
          aria-label="Add a fridge location to the map"
        >
          ADD A FRIDGE
        </ButtonLink>
      </Box>
      <PageFooter />
    </>
  );
}
StartAFridgePage.propTypes = PropTypes.exact({
  content: PropTypes.arrayOf(DecoratedParagraph.propTypes),
}).isRequired;
