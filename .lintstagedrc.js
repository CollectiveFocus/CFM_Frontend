const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

console.log(
  'Running "yarn lint", "yarn style" on commit files. Please wait...'
);

module.exports = {
  '*.{js,jsx,mjs}': [buildEslintCommand, 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
  '*.svg': ['svgo --quiet'],
};
