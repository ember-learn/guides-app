import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | dropdown menu', function(hooks) {
  setupApplicationTest(hooks);

  test('version navigation by dropdown menu', async function(assert) {
    await visit('/v2.17.0/models/');
    await click('.ember-basic-dropdown-trigger')
    await click('.ember-power-select-option:contains("v2.10.0")')
    assert.equal(currentURL(), '/v2.10.0');
    await click('.ember-basic-dropdown-trigger')
    await click('.ember-power-select-option:contains("v1.10.0")')
    assert.equal(currentURL(), '/v1.10.0');
  });
});
