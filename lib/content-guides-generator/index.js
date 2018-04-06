'use strict';

const BroccoliMergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const StaticSiteJson = require('broccoli-static-site-json');
const walkSync = require('walk-sync');
const writeFile = require('broccoli-file-creator');
const yaml = require('js-yaml');

const { readFileSync } = require('fs');
const { Serializer } = require('jsonapi-serializer');
const { extname } = require('path');


const guidesSourcePublic = new Funnel('node_modules/@ember/guides-source/public');

const VersionsSerializer = new Serializer('version', {
  attributes: [
    'allVersions',
    'currentVersion',
  ],
});

const versions = yaml.safeLoad(readFileSync('node_modules/@ember/guides-source/versions.yml', 'utf8'));

let premberVersions = [...versions.allVersions, 'current'];

const urls = premberVersions.map(version => `/${version}`);

premberVersions.forEach((premberVersion) => {
  const filesVersion = premberVersion === 'current' ? versions.currentVersion : premberVersion;
  const paths = walkSync(`node_modules/@ember/guides-source/guides/${filesVersion}`);

  const mdFiles = paths.
    filter(path => extname(path) === '.md')
    .map(path => path.replace(/\.md/, ''))
    .map(path => path.replace(/\/index$/, ''));

  mdFiles.forEach((file) => {
    urls.push(`/${premberVersion}/${file}`)
  })
});

// setting an ID so that it's not undefined
versions.id = 'versions';

const jsonTrees = versions.allVersions.map((version) => new StaticSiteJson(`node_modules/@ember/guides-source/guides/${version}`, {
  contentFolder: `content/${version}`,
  type: 'contents',
}));

var versionsFile = writeFile('/content/versions.json', JSON.stringify(VersionsSerializer.serialize(versions)));

module.exports = {
  name: 'content-docs-generator',

  isDevelopingAddon() {
    return true;
  },

  urlsForPrember() {
    return urls;
  },

  treeForPublic() {
    return new BroccoliMergeTrees([versionsFile, guidesSourcePublic, ...jsonTrees]);
  }
};
