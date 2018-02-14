import { module, test } from 'qunit';
import { find } from 'ember-native-dom-helpers';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | current url', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /current-url', async function(assert) {
    await visit('/current');
    let page = this.owner.lookup('service:page');
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });
});
