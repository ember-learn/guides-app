import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('page', {version: 'v2.15.0'});
  }
});
