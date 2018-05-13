import { currentURL, visit } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';


module('Acceptance | dropdown menu', function(hooks) {
  setupApplicationTest(hooks);

  test('version navigation by dropdown menu', async function(assert) {
    await visit('/v2.17.0/models/');

    await selectChoose('.ember-basic-dropdown-trigger', 'v2.10.0');
    assert.equal(currentURL(), '/v2.10.0');

    await selectChoose('.ember-basic-dropdown-trigger', 'v1.10.0');
    assert.equal(currentURL(), '/v1.10.0');
  });
});
