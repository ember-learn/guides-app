import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  page: service(),
  model() {
    let { version } = this.modelFor('version');

    return hash({
      content: this.store.queryRecord('content', {
        path: 'index',
        version,
      }),
      pages: get(this, 'store').query('page', { version }),
      version,
    })
  },

  afterModel(model) {
    let content = get(model, 'content');
    set(get(this, 'page'), 'content', content);
    let version = get(model, 'version');
    set(get(this, 'page'), 'currentVersion', version);
  }
});
