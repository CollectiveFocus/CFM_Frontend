module.exports = {
  multipass: true,
  plugins: [
    'preset-default',
    'removeOffCanvasPaths',
    'convertStyleToAttrs',
    'sortAttrs',
    {
      name: 'removeAttributesBySelector',
      params: {
        selectors: [
          {
            selector: '[stroke-opacity="1"]',
            attributes: ['path', 'circle'],
          },
          {
            selector: '[stroke-dasharray="none"]',
            attributes: ['path', 'circle'],
          },
        ],
      },
    },
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
};
