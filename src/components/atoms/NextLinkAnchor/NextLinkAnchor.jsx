import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

/**
 * This component allows Next/Link to function correctly when it is passed into another react component using props.
 *
 * @see https://nextjs.org/docs/routing/introduction
 * @see https://github.com/mui/material-ui/blob/master/examples/nextjs-with-typescript/src/Link.tsx
 *
 * @param {Object} props
 * @param {Element} ref
 */
const NextLinkAnchor = React.forwardRef(function (props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch = false,
    locale,
    ...attributes
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <a ref={ref} {...attributes} />
    </NextLink>
  );
});

NextLinkAnchor.displayName = 'NextLinkAnchor';

const toPathname = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
});

NextLinkAnchor.propTypes = {
  /**
   * The URL or pathname object to navigate to.
   *
   * to='/about'
   * to={{ pathname: '/blog/[slug]', query: { slug: post.slug }, }}
   */
  to: PropTypes.oneOfType([PropTypes.string, toPathname]),

  /**
   * Optional HTML attributes for the <a /> tag
   */
  attributes: PropTypes.object,

  /**
   * Optional decorator for the path that will be shown in the browser URL bar.
   */
  linkAs: PropTypes.string,

  /**
   * Allows for providing a different locale.
   */
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /**
   * Prefetch the page in the background.
   */
  prefetch: PropTypes.bool,

  /**
   * Replace the current history state instead of adding a new url into the stack.
   */
  replace: PropTypes.bool,

  /**
   * Scroll to the top of the page after a navigation.
   */
  scroll: PropTypes.bool,

  /**
   * Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps.
   */
  shallow: PropTypes.bool,
};

export default NextLinkAnchor;
