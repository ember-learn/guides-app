'use strict';

const BroccoliMergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const StaticSiteJson = require('broccoli-static-site-json');
const writeFile = require('broccoli-file-creator');
const yaml = require('js-yaml');
const { readFileSync } = require('fs');
const { Serializer } = require('jsonapi-serializer');


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
  contentFolder: `content/${version}`,
  type: 'contents',
}));

const versionsFile = writeFile('/content/versions.json', JSON.stringify(VersionsSerializer.serialize(versions)));

module.exports = {
  name: 'content-docs-generator',

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return new BroccoliMergeTrees([versionsFile, guidesSourcePublic, ...jsonTrees]);
  }
};
