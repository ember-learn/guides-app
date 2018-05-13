import { click, currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | table of contents', function(hooks) {
  setupApplicationTest(hooks);

  test('navigation by TOC', async function(assert) {
    await visit('/v2.17.0/');

    await click('.toc-level-0 > li:nth-child(4) a');
    await click('a[href*=defining-your-routes]');

    assert.equal(currentURL(), '/v2.17.0/routing/defining-your-routes');
  });
});
