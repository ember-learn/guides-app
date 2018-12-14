import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { get, set } from '@ember/object';
import { and } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

const SEARCH_DEBOUNCE_PERIOD = 300;
const SEARCH_CLOSE_PERIOD = 200;

export default Component.extend({
  classNames: ['search-input'],

  // page: service(),
  searchService: service('search'),

  _resultTetherConstraints: Object.freeze([
    {
      to: 'window',
      pin: ['left','right']
    }
  ]),

  _focused: false,

  init() {
    this._super(...arguments);
    const config = getOwner(this).resolveRegistration('config:environment');
    this.deprecationsGuideURL = config['deprecationsGuideURL'];
  },

  showDropdown: and('query', '_focused'),

  search: task(function * (query) {

    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    set(this, 'query', query);

    // Hide and don't run query if there's no search query
    if (!query) {
      return set(this, '_focused', false);
    }

    // ensure search results are visible if the menu was previously closed above
    set(this, '_focused', true);

    yield get(this, 'searchService.search').perform(query, this.projectVersion);

  }).restartable(),

  closeMenu: task(function * () {
    yield timeout(SEARCH_CLOSE_PERIOD);

    set(this, '_focused', false);
  }),

  actions: {
    onfocus() {
      set(this, '_focused', true);
    },

    onblur() {
      this.get('closeMenu').perform();
    }

  }
});
