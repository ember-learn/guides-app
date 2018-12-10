import Route from '@ember/routing/route';

export default class Application extends Route {
  model() {
    return this.store.findRecord('version', 'versions');
  }
}
