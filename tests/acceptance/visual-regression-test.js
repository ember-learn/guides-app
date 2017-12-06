import { test } from 'qunit';
import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';

import pages from './pages';

moduleForAcceptance('Acceptance | visual regression');

pages.data.forEach((section) => {
  section.attributes.pages.forEach((page) => {
    test(`visiting visual regressions on ${section.id}:${page.url} with Percy`, function(assert) {
      assert.expect(0);

      visit(`/v2.15.0/${page.url}`);

      andThen(function() {
        let name;

        if (page.url.endsWith('index')) {
          name = `/${page.url}.html`;
        } else {
          name = `/${page.url}/index.html`;
        }

        percySnapshot(name);
      });
    });
  })
})
