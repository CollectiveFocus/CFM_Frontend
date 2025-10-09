import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import AppBar from 'components/molecules/AppBar';

import createEmotionCache from 'lib/createEmotionCache';
import GoogleAnalytics from 'lib/analytics';
import theme from 'theme';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      GoogleAnalytics.view(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        id="ga-library"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalytics.TRACKING_ID}`}
      />
      <Script id="ga-loader" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GoogleAnalytics.TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
