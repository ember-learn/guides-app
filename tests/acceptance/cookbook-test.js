import { test } from 'qunit';
import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | cookbook');

/*
Cookbook gets its own tests because it has one additional layer of nesting than
the rest of the guides
*/

test('visiting /cookbook', function(assert) {
  visit('/v1.10.0/cookbook/');
  andThen(function() {
    assert.equal(currentURL(), '/v1.10.0/cookbook/');
  });
  click('.next-guide')
  andThen(function() {
    assert.equal(currentURL(), '/v1.10.0/cookbook/contributing');
  });
  click('.next-guide')
  andThen(function() {
    assert.equal(currentURL(), '/v1.10.0/cookbook/contributing/understanding_the_cookbook_format');
  });
  click('.previous-guide')
  andThen(function() {
    assert.equal(currentURL(), '/v1.10.0/cookbook/contributing');
  });
});
