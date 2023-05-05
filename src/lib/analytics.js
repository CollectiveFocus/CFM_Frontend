/**
 * Analytics tracking.
 * @module lib/analytics
 *
 * From https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
 */

/**
 * @constant {string} TRACKING_ID - Analytics tracking id.
 *
 * Local, Staging, and Production each have their own id. Therefore the id is set in the envirnoment configurion.
 */
const TRACKING_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

/**
 * Track a view for the specified URL.
 * @param {string} url - The url of the page.
 */
const view = (url) => {
  window.gtag('config', TRACKING_ID, { page_path: url });
};

/**
 * Track a specific event.
 * @param {string} type - The type of event, such as a Google Ads conversion event or a Google Analytics 4 event
 * @param {string} parameters - Object of name/value pairs that describes the event
 */
const event = (type, parameters) => {
  window.gtag('event', type, parameters);
};

const GoogleAnalytics = { TRACKING_ID, view, event };

export default GoogleAnalytics;
