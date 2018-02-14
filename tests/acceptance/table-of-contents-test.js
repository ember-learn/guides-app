import { module, test } from 'qunit';
import { click, find, findAll } from 'ember-native-dom-helpers';
import { currentURL, visit } from '@ember/test-helpers';
import wait from 'ember-test-helpers/wait';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | table of contents', function(hooks) {
  setupApplicationTest(hooks);

  test('navigation by TOC', async function(assert) {
    await visit('/v2.17.0/');
    const routing = find('a', findAll('.toc-level-0')[4]);
    await click(routing);
    const definingYourRoutes = find('a', findAll('.toc-level-1', )[2]);
    await click(definingYourRoutes);
    return wait().then(() => {
      assert.equal(currentURL(), '/v2.17.0/routing/defining-your-routes');
    });
  });
});
