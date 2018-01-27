import { test } from 'qunit';
import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | previous next links');

test('navigation by previous and next links', function(assert) {
  visit('/v2.17.0/models/');
  andThen(function() {
    assert.equal(currentURL(), '/v2.17.0/models/');
  });
  click('.next-guide')
  andThen(function() {
    assert.equal(currentURL(), '/v2.17.0/models/defining-models');
  });
  click('.next-guide')
  andThen(function() {
    assert.equal(currentURL(), '/v2.17.0/models/finding-records');
  });
  click('.previous-guide')
  andThen(function() {
    assert.equal(currentURL(), '/v2.17.0/models/defining-models');
  });
});
