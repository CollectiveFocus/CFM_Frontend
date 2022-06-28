import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { NextLinkAnchor } from 'components/atoms';

export default function ButtonLink(props) {
  return <Button component={NextLinkAnchor} {...props} />;
}

const toPathname = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
});

ButtonLink.propTypes = {
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
  ariaLabel: PropTypes.string.isRequired,

  /***
   * Style of button from theme
   */
  variant: PropTypes.oneOf(['outlined', 'contained']).isRequired,
};
