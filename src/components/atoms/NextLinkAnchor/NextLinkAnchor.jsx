import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

/**
 * HOC that will be passed into another component to create a NextLink
 *
 * @param {Object} props
 * @param {Element} ref
 */
function NextLinkAnchor(props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
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
}

export default React.forwardRef(NextLinkAnchor);

const propsShape = {
  /**
   * The path or URL to navigate to.
   */
  to: PropTypes.string.isRequired,

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

NextLinkAnchor.propTypes = {
  props: PropTypes.shape(propsShape).isRequired,
  ref: PropTypes.element,
};
