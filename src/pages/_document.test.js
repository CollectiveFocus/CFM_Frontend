import React from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import path from 'node:path';

// Mock Next.js Document and its subcomponents
jest.mock('next/document', () => {
  // Stub Document class with a no-op getInitialProps
  class Document extends React.Component {}
  Document.getInitialProps = async () => ({
    html: '<div id="__next"></div>',
    head: [],
    styles: [],
  });

  // Stub Html, Head, Main, NextScript to avoid internal hooks
  function Html({ children }) {
    return React.createElement('html', {}, children);
  }
  Html.propTypes = {
    children: PropTypes.node,
  };

  function Head({ children }) {
    return React.createElement('head', {}, children);
  }
  Head.propTypes = {
    children: PropTypes.node,
  };

  function Main() {
    return React.createElement('div', { id: '__next' });
  }
  function NextScript() {
    return null;
  }

  return {
    __esModule: true,
    default: Document,
    Html,
    Head,
    Main,
    NextScript,
  };
});

// Mock Emotion SSR to skip real CSS extraction
jest.mock('@emotion/server/create-instance', () => () => ({
  extractCriticalToChunks: () => ({ styles: [] }),
}));

describe('Google Analytics injection into _document', () => {
  const ORIGINAL_ENV = Object.freeze(process.env);

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  // Render _document.page.js with the stubbed getInitialProps
  async function renderDocument() {
    const MyDocument = require(
      path.resolve(__dirname, '../pages/_document.page.js')
    ).default;

    const initialProps = await MyDocument.getInitialProps({
      renderPage: () => ({}),
    });

    return renderToStaticMarkup(<MyDocument {...initialProps} />);
  }

  it('injects the production NEXT_PUBLIC_ANALYTICS_ID', async () => {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'PROD-123';

    const html = await renderDocument();
    expect(html).toContain(
      'https://www.googletagmanager.com/gtag/js?id=PROD-123'
    );
    expect(html).toContain(`gtag('config', 'PROD-123'`);
  });

  it('injects the development NEXT_PUBLIC_ANALYTICS_ID', async () => {
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'DEV-456';

    const html = await renderDocument();
    expect(html).toContain(
      'https://www.googletagmanager.com/gtag/js?id=DEV-456'
    );
    expect(html).toContain(`gtag('config', 'DEV-456'`);
  });

  it('omits the GA script when googleAnalytics.TRACKING_ID is missing', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.NEXT_PUBLIC_ANALYTICS_ID;

    const html = await renderDocument();
    expect(html).not.toContain('googletagmanager.com/gtag/js?id=');
  });
});
