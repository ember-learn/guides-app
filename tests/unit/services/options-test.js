import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | options', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:options');
    assert.ok(service);
  });

  test('code styles include Ember and ES6', function(assert) {
    let service = this.owner.lookup('service:options');

    let ember = service.codeStyles.filter(s => s.name ==='Ember Traditional');
    assert.ok(ember);
    assert.equal(ember.mdStyle, 'ember');

    let es6 = service.codeStyles.filter(s => s.name ==='ES6');
    assert.ok(es6);
    assert.equal(es6.mdStyle, 'es6');
  });
});

