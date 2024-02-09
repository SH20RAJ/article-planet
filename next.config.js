module.exports = {
    exportPathMap: async function (defaultPathMap) {
      return {
        '/': { page: '/index.html' }, // Change '/_app' to '/index.html' if you have a custom layout
        ...defaultPathMap
      };
    },
  };
  