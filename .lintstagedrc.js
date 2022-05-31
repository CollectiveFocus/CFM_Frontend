const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx}': [buildEslintCommand],
  '*.css': ['csslint --format=compact --config=.csslintrc.json'],
  '*': ['prettier --write --ignore-unknown'],
  'public/**/*.svg': ['svgo'],
};
