'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-prism': {
      'theme': 'okaidia',
      'components': ['scss', 'javascript', 'handlebars', 'http', 'json'],
      'plugins': ['line-numbers', 'normalize-whitespace']
    },
    fingerprint: {
      extensions: ['js', 'css', 'map'],
    },
    "ember-bootstrap": {
      bootstrapVersion: 4,
      importBootstrapFont: false,
      importBootstrapCSS: false
    }
  });

  app.import('node_modules/compare-versions/index.js');

  return app.toTree();
};
