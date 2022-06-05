module.exports = {
  multipass: true, // boolean. false by default

  plugins: [
    // set of built-in plugins enabled by default
    'preset-default',

    // or by expanded notation which allows to configure plugin
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
};
