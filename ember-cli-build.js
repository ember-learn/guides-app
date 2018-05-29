'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const resolve = require('resolve');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-prism': {
      'theme': 'okaidia',
      'components': [
        'apacheconf',
        'bash',
        'css',
        'handlebars',
        'http',
        'javascript',
        'json',
        'markup-templating',
        'ruby',
        'scss',
      ],
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

  app.import(resolve.sync('downsize-cjs'), {
    using: [
      { transformation: 'cjs', as: 'downsize'}
    ]
  });

  return app.toTree();
};
