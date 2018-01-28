import { test } from 'qunit';
import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dropdown menu');

test('version navigation by dropdown menu', function(assert) {
  visit('/v2.17.0/models/');
  click('.ember-basic-dropdown-trigger')
  click('.ember-power-select-option:contains("v2.10.0")')
  andThen(function() {
    assert.equal(currentURL(), '/v2.10.0');
  });
  click('.ember-basic-dropdown-trigger')
  click('.ember-power-select-option:contains("v1.10.0")')
  andThen(function() {
    assert.equal(currentURL(), '/v1.10.0');
  });
});
