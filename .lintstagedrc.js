console.log('Running "yarn style" on commit files. Please wait...');

module.exports = {
  '*': ['prettier --write --ignore-unknown'],
  '*.svg': ['svgo --quiet'],
};
