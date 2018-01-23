'use strict';

const { readFileSync } = require('fs');
const StaticSiteJson = require('broccoli-static-site-json');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const yaml = require('js-yaml');
const { Serializer } = require('jsonapi-serializer');
const writeFile = require('broccoli-file-creator');
const Funnel = require('broccoli-funnel');
const walkSync = require('walk-sync');
const { extname } = require('path');

const guidesSourcePublic = new Funnel('node_modules/@ember/guides-source/public');

const VersionsSerializer = new Serializer('version', {
  attributes: [
    'allVersions',
    'currentVersion',
  ],
});

const versions = yaml.safeLoad(readFileSync('node_modules/@ember/guides-source/versions.yml', 'utf8'));

let premberVersions = [];

if(!process.env.JSON_ONLY) {
  premberVersions = versions.allVersions;
}

const urls = premberVersions.map(version => `/${version}`);

premberVersions.forEach((version) => {
  const paths = walkSync(`node_modules/@ember/guides-source/guides/${version}`);

  const mdFiles = paths.
    filter(path => extname(path) === '.md')
    .map(path => path.replace(/\.md/, ''))
    .map(path => path.replace(/\/index$/, ''));

  mdFiles.forEach((file) => {
    urls.push(`/${version}/${file}`)
  })
});

// setting an ID so that it's not undefined
versions.id = 'versions';

const jsonTrees = versions.allVersions.map((version) => new StaticSiteJson(`node_modules/@ember/guides-source/guides/${version}`, {
  contentFolder: `content/${version}`,
  type: 'contents',
}));

var versionsFile = writeFile('/content/versions.json', JSON.stringify(VersionsSerializer.serialize(versions)));

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-prism': {
      'theme': 'okaidia',
      'components': ['scss', 'javascript', 'handlebars', 'http', 'json'],
      'plugins': ['line-numbers', 'normalize-whitespace']
    },
    prember: {
      urls,
    }
  });

  app.import('node_modules/compare-versions/index.js');

  return new BroccoliMergeTrees([app.toTree(), versionsFile, guidesSourcePublic, ...jsonTrees]);
};
