import { module, test } from 'qunit';
import { click } from 'ember-native-dom-helpers';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

/*
Cookbook gets its own tests because it has one additional layer of nesting than
the rest of the guides
*/

module('Acceptance | cookbook', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /cookbook', async function(assert) {
    await visit('/v1.10.0/cookbook/');
    assert.equal(currentURL(), '/v1.10.0/cookbook/');

    await click('.next-guide');
    assert.equal(currentURL(), '/v1.10.0/cookbook/contributing');

    await click('.next-guide');
    assert.equal(currentURL(), '/v1.10.0/cookbook/contributing/understanding_the_cookbook_format');

    await click('.previous-guide');
    assert.equal(currentURL(), '/v1.10.0/cookbook/contributing');
  });
});
