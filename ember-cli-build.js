/* eslint-env node */
'use strict';

const { readFileSync } = require('fs');
const StaticSiteJson = require('broccoli-static-site-json');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const yaml = require('js-yaml');
const { Serializer } = require('jsonapi-serializer');
const writeFile = require('broccoli-file-creator');

const VersionsSerializer = new Serializer('version', {
  attributes: [
    'allVersions',
    'currentVersion',
  ],
});

const versions = yaml.safeLoad(readFileSync('node_modules/@ember/guides-source/versions.yml', 'utf8'));

// setting an ID so that it's not undefined
versions.id = 'versions';

const jsonTrees = versions.allVersions.map((version) => new StaticSiteJson(`node_modules/@ember/guides-source/guides/${version}`, {
  contentFolder: `content/${version}`
}));

var versionsFile = writeFile('/content/versions.json', JSON.stringify(VersionsSerializer.serialize(versions)));

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-prism': {
      'theme': 'okaidia',
      'components': ['scss', 'javascript'], //needs to be an array, or undefined.
      'plugins': ['line-numbers']
    }
  });

  return new BroccoliMergeTrees([app.toTree(), versionsFile, ...jsonTrees]);
};
