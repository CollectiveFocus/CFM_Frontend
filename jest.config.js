const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './' /** path to next.config.js and .env files in your test environment */,
});

/**
 * Configuration passed directly to Jest.
 *
 * @type {import('jest').Config}
 */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', 'src'],

  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
