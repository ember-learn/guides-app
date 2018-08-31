/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const GH_LINK = 'https://github.com/ember-learn/guides-source/edit/master/guides';

const ARTICLE = `
\`\`\`javascript {data-filename="tests/acceptance/list-rentals-test.js" data-diff="+7,-8,+9,-10,+11,-12,+13"}
import { module, test } from 'qunit';↵import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL } from '@ember/test-helpers';

module('Acceptance | my acceptance test', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /list-rentals', async function(assert) {
  test('visiting /', async function(assert) {
    await visit('/list-rentals');
    await visit('/');
    assert.equal(currentURL(), '/list-rentals');
    assert.equal(currentURL(), '/');
  });
});
\`\`\`
`;

module('Integration | Component | guides-article', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows basic article information', async function(assert) {
    this.set('version', 'v3.2.0');
    this.set('currentVersion', 'v3.2.0');
    this.set('model', {
      content: 'Oh hi',
      id: 123
    });

    let pageServiceStub = Service.extend({
      currentPage: {
        title: 'Fresh Fish'
      },
      currentVersion: 'v3.2.0'
    });
    this.owner.register('service:page', pageServiceStub);

    await render(hbs`{{guides-article model=model version=version currentVersion=currentVersion}}`);

    assert.dom('.old-version-warning').doesNotExist();
    assert.dom('h1').hasText('Fresh Fish Edit Page');
    assert.dom('h1 a').hasAttribute('href', `${GH_LINK}/v3.2.0/123.md`, 'correct guides OSS link is shown');
  });

  test('it formats code blocks', async function(assert) {
    this.set('version', 'v3.2.0');
    this.set('currentVersion', 'v2.2.0');
    this.set('model', {
      content: ARTICLE,
      id: 123
    });

    await render(hbs`{{guides-article model=model version=version currentVersion=currentVersion}}`);

    assert.dom('.old-version-warning').exists();
    assert.dom('.line-numbers-rows span').exists({ count: 14 });
    assert.dom('.diff-deletion').exists({ count: 3 });
    assert.dom('.diff-insertion').exists({ count: 4 });
    assert.dom('div.filename span').hasText('tests/acceptance/list-rentals-test.js', 'filename is shown');
  });
});
