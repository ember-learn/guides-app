import { test } from 'qunit';

module('Acceptance | current url', function(hooks) {
  setupApplicationTest(hooks);

test('visiting /release-url', function (assert) {
  visit('/release');
  let page = this.application.__container__.lookup('service:page');
  andThen(function () {
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });

  test('visiting / redirects you to /release', async function(assert) {
    await visit('/');
    let page = this.application.__container__.lookup('service:page');
    assert.equal(currentURL(), "/release");

    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').textContent.trim(), currentVersion);
  });
});
