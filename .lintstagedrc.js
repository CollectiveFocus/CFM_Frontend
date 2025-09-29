console.log('Running "yarn style" on commit files. Please wait...');

export default {
  '*': ['prettier --write --ignore-unknown'],
  '*.svg': ['svgo --quiet'],
};
