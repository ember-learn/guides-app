import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    let versionModel = this.modelFor('version');

    return hash({
      content: this.store.queryRecord('content', {
        path: 'index',
        version: get(versionModel, 'version'),
      }),
      pages: get(this, 'store').query('page', { version: get(versionModel, 'version') })
    })
  }
});
