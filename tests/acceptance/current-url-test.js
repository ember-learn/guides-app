import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | current url');

test('visiting /release-url', function (assert) {
  visit('/release');
  let page = this.application.__container__.lookup('service:page');
  andThen(function () {
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').text().trim(), currentVersion);
  });
});

test('visiting / redirects you to /release', function (assert) {
  visit('/');
  let page = this.application.__container__.lookup('service:page');
  andThen(function () {
    assert.equal(currentURL(), "/release");

    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').text().trim(), currentVersion);
  });
});
