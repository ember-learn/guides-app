import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

function selectOption(option) {
  return [].find.call(document.querySelectorAll('.ember-power-select-option'), (element) => element.innerText === option)
}

module('Acceptance | version menu when changing versions', function(hooks) {
  setupApplicationTest(hooks);

  test('stays on index page', async function(assert) {
    await visit('/v2.17.0/');
    await click('.ember-basic-dropdown-trigger')
    await click(selectOption("2.10"))
    assert.equal(currentURL(), '/v2.10.0');
  });

  test('stays on same section', async function(assert) {
    await visit('/v1.13.0/getting-started/');
    await click('.ember-basic-dropdown-trigger')
    await click(selectOption("1.12"))
    assert.equal(currentURL(), '/v1.12.0/getting-started');
  });

  test('stays on same section and page', async function(assert) {
    await visit('/v3.0.0/object-model/classes-and-instances/');
    await click('.ember-basic-dropdown-trigger')
    await click(selectOption("3.1"))
    assert.equal(currentURL(), '/v3.1.0/object-model/classes-and-instances');
  });

  test("redirects to index page if current section/page doesn't exist in new version", async function(assert) {
    await visit('/v1.10.0/getting-started/using-fixtures/');
    await click('.ember-basic-dropdown-trigger')
    await click(selectOption("1.13"))
    assert.equal(currentURL(), '/v1.13.0');
  });
});
