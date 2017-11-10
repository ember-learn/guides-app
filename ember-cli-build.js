/* eslint-env node */
'use strict';

const StaticSiteJson = require('broccoli-static-site-json');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const BroccoliMergeTrees = require('broccoli-merge-trees');

const jsonTree = new StaticSiteJson('node_modules/@stonecircle/guides-source/v2.15.0', {});

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-prism': {
      'theme': 'okaidia',
      'components': ['scss', 'javascript'], //needs to be an array, or undefined.
      'plugins': ['line-numbers']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return new BroccoliMergeTrees([app.toTree(), jsonTree]);
};
