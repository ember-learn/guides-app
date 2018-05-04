import { get } from '@ember/object';
import { visit } from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | visual regression', function(hooks) {
  setupApplicationTest(hooks);

  test(`visiting visual regressions with Percy`, async function(assert) {
    assert.expect(0);
    await visit('/current');

    let store = this.owner.lookup('service:store');
    let pages = store.peekAll('page');

    pages.forEach((section) => {
      section.get('pages').forEach(async page => {
        let url = get(page, 'url');

        await visit(`/release/${url}`);

        let name = `/${page.url}/index.html`;

        if (page.url.endsWith('index')) {
          name = `/${page.url}.html`;
        } else if (page.url.endsWith('index/')) {
          name = '/index.html';
        }

        percySnapshot(name);
      })
    })
  });
});
