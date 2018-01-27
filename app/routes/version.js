import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Route.extend({
  page: service(),
  model(params) {
    let applicationModel = this.modelFor('application');
    let version;

    if (params.version === 'current') {
      version = get(applicationModel, 'currentVersion');
    } else {
      version = params.version;
    }

    return hash({
      pages: this.store.query('page', { version }),
      allVersions: get(applicationModel, 'allVersions'),
      version: version,
    });
  },

  afterModel(model) {
    let pages = get(model, 'pages');

    set(get(this, 'page'), 'pages', pages);
  }
});
