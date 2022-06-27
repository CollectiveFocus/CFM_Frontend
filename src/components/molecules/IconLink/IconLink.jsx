import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { NextLinkAnchor } from 'components/atoms';

export default function IconLink(props) {
  return <IconButton component={NextLinkAnchor} {...props} />;
}

const toPathname = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
});

IconLink.propTypes = {
  /**
   * The URL or pathname object to navigate to.
   *
   * to='/about'
   * to={{ pathname: '/blog/[slug]', query: { slug: post.slug }, }}
   */
  to: PropTypes.oneOfType([PropTypes.string, toPathname]).isRequired,

  /**
   * Text describing the content of the link.
   * eg: aria-label='Learn more about the community fridge map project.'
   */
  'aria-label': PropTypes.string.isRequired,
};
