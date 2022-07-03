const path = require('path');

const buildEslintCommand = (filenames) => `npx eslint --fix
    ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

console.log(
  'Running "yarn lint", "yarn style" on commit files. Please wait...'
);

module.exports = {
  '*.{js,jsx,mjs}': ['npx eslint --fix', 'prettier --write'],
  '*.{json,md,yaml}': ['prettier --write'],
  '*.svg': ['svgo --quiet'],
};
