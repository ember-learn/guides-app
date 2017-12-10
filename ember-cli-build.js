/* eslint-env node */
'use strict';

const { readFileSync } = require('fs');
const StaticSiteJson = require('broccoli-static-site-json');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const yaml = require('js-yaml');
const { Serializer } = require('jsonapi-serializer');
const writeFile = require('broccoli-file-creator');
const Funnel = require('broccoli-funnel');

const guidesSourcePublic = new Funnel('node_modules/@ember/guides-source/public');

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
      'components': ['scss', 'javascript', 'handlebars'],
      'plugins': ['line-numbers', 'normalize-whitespace']
    }
  });

  app.import('node_modules/compare-versions/index.js');

  return new BroccoliMergeTrees([app.toTree(), versionsFile, guidesSourcePublic, ...jsonTrees]);
};
