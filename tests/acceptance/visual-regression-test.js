import { test } from 'qunit';
import { get } from '@ember/object';
import moduleForAcceptance from 'guides-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | visual regression');

test(`visiting visual regressions with Percy`, function(assert) {
  assert.expect(0);
  visit('/current');

  andThen(() => {
    let store = this.application.__container__.lookup('service:store');
    let pages = store.peekAll('page');

    pages.forEach((section) => {
      section.get('pages').forEach((page) => {

        let url = get(page, 'url');

        visit(`/release/${url}`);

        andThen(function() {
          let name;

          if (page.url.endsWith('index')) {
            name = `/${page.url}.html`;
          } else if (page.url.endsWith('index/')) {
            name = '/index.html';
          } else {
            name = `/${page.url}/index.html`;
          }

          percySnapshot(name);
        });
      })
    })
  })

});
