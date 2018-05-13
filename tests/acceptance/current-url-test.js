import { currentURL, find, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | current url', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /release-url', async function(assert) {
    await visit('/release');
    let page = this.owner.lookup('service:page');
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });

  test('visiting / redirects you to /release', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), "/release");
  });
});
