import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  model() {
    let versionModel = this.modelFor('version');

    return this.store.queryRecord('content', {
      path: 'index',
      version: get(versionModel, 'version'),
    });
  }
});
