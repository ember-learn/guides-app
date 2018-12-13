import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Component | search input', function(hooks) {
  setupRenderingTest(hooks);

  test('no search hits display no results', async function(assert) {

    let searchService = this.owner.lookup('service:search');

    set(searchService, 'doSearch', () => {
      return [];
    });

    await this.render(hbs`{{search-input}}`);

    await fillIn('#search-input', 'model');

    assert.dom('.algolia-docsearch-suggestion--noresults').exists();
  });
});
