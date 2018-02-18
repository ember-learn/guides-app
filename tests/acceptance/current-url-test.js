import { test } from 'qunit';
import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | current url');

// We need to support legacy `current` urls, but we should use release
// in order to keep in step with ember-api-docs url convention

test('visiting /current-url', function(assert) {
  visit('/current');
  let page = this.application.__container__.lookup('service:page');
  andThen(function() {
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').text().trim(), currentVersion);
  });
});

test('visiting /release-url', function (assert) {
  visit('/release');
  let page = this.application.__container__.lookup('service:page');
  andThen(function () {
    let currentVersion = page.get('currentVersion');
    assert.equal(find('.ember-basic-dropdown-trigger').text().trim(), currentVersion);
  });
});