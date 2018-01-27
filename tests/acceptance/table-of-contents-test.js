import { test } from 'qunit';
import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | table of contents');

test('navigation by TOC', function(assert) {
  visit('/v2.17.0/');
  click('a:contains("Routing")')
  click('a:contains("Defining Your Routes")')
  andThen(function() {
    assert.equal(currentURL(), '/v2.17.0/routing/defining-your-routes');
  });
});
