import Component from '@ember/component';

import { later } from '@ember/runloop';
import { denodeify } from 'rsvp';
import { A } from '@ember/array';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';
import algoliasearch from 'algoliasearch';
import { get, set } from '@ember/object';

const SEARCH_DEBOUNCE_PERIOD = 300;

export default Component.extend({
  classNames: ['search-input'],

  page: service(),

  _resultTetherConstraints: Object.freeze([
    {
      to: 'window',
      pin: ['left','right']
    }
  ]),

  init() {
    this._super(...arguments);
    const config = Ember.getOwner(this).resolveRegistration('config:environment');

    this.client = algoliasearch(config['ember-algolia'].algoliaId, config['ember-algolia'].algoliaKey);
    this.index = this.client.initIndex('ember-guides');
    this.searchFunction = denodeify(this.index.search.bind(this.index));
  },

  pageIndex: computed('page.pages.[]', function() {
    let pages = this.page.pages.map((section) => {
      return section.pages.map(page => {
          return {
            section: section.title,
            page: page.title,
            fullTitle: `${section.title} > ${page.title}`,
            url: page.url.replace(/\/index$/, '')
          }
      })
    });

    return pages.reduce((a, b) => a.concat(b), []);
  }),

  search: task(function * (query) {

    console.log(this.pageIndex);

    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    const client = get(this, '_searchClient');
    // const projectVersion = get(this, '_projectVersion');
    const projectVersion = get(this, 'projectVersion');

    const searchObj = {
      hitsPerPage: 15,
      restrictSearchableAttributes: ['content'],
      facetFilters: [[`version:${projectVersion}`]],
      query
    };

    let res = yield this.searchFunction(searchObj);

    const results = get(res, 'hits');

    console.log('results', results, searchObj);

    return set(this, '_results', results);
  }).restartable(),

  actions: {
    oninput(value) {
      set(this, 'value', value);
      if(value) {
        get(this, 'search').perform(value);
      }
    },

    onfocus() {
      set(this, '_focused', true);
    },

    onblur() {
      later(this, function () {
        set(this, '_focused', false);
      }, 200);
    }

  }
});
