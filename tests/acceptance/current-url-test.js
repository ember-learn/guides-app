import { currentURL, find, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | current url', function(hooks) {
  setupApplicationTest(hooks);

  /**
   * In the old Guides app, `/current` used to redirect to the latest
   * version of the guides. So to honor old bookmarks we still
   * preserve this behavior while introducing `/release` path to be
   * consistent with ember API docs app.
  */
  test('visiting /current-url', async function(assert) {
    await visit('/current');
    let page = this.owner.lookup('service:page');
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });

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
