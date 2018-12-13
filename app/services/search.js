import Service from '@ember/service';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { A as emberArray } from '@ember/array';
import { denodeify } from 'rsvp';
import algoliasearch from 'algoliasearch';
import { getOwner } from '@ember/application';

export default Service.extend({

  results: emberArray(),

  search: task(function * (query, projectVersion) {
    const searchObj = {
      hitsPerPage: 15,
      restrictSearchableAttributes: ['content'],
      facetFilters: [[`version:${projectVersion}`]],
      query
    };

    return set(this, 'results', yield this.doSearch(searchObj));

  }).restartable(),

  doSearch(searchObj) {
    const config = getOwner(this).resolveRegistration('config:environment');
    const { algoliaId, algoliaKey } = config['ember-algolia'];

    const client = algoliasearch(algoliaId, algoliaKey);
    const index = client.initIndex('ember-guides');
    const searchFunction = denodeify(index.search.bind(index));

    return searchFunction(searchObj).then((results) => {
      return get(results, 'hits');
    });
  }
});
