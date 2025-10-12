import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { NextLink } from 'components/atoms';

export default function ButtonLink(props) {
  const { title, ...buttonProps } = props;
  return (
    <Button component={NextLink} {...buttonProps}>
      {title}
    </Button>
  );
}

const toPathname = PropTypes.exact({
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
});

ButtonLink.propTypes = {
  /**
   * The title of the button.
   *
   * title='GO TO FRIDGE'
   */
  title: PropTypes.string.isRequired,

  /**
   * The URL or pathname object to navigate to.
   *
   * to='/about'
   * to={{ pathname: '/blog/[slug]', query: { slug: post.slug }, }}
   */
  to: PropTypes.oneOfType([PropTypes.string, toPathname]).isRequired,

  /**
   * Text describing the content of the link.
   * eg: aria-label='Learn more about the Fridge Finder project.'
   */
  'aria-label': PropTypes.string.isRequired,

  /***
   * Style of button from theme
   */
  variant: PropTypes.oneOf(['outlined', 'contained']).isRequired,
};
