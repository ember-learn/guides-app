import { get, set } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  page: service(),

  model(params) {
    let applicationModel = this.modelFor('application');
<<<<<<< HEAD
    let currentVersion = get(applicationModel, 'currentVersion');
=======
    let { currentVersion } = applicationModel;
>>>>>>> Upgrade fixes & utilize ember-styleguide components
    let version = params.version;

    if (params.version === 'release') {
      version = currentVersion;
    }

    return hash({
      pages: this.store.query('page', { version }),
      allVersions: get(applicationModel, 'allVersions'),
      currentVersion,
      version: version,
    });
  },

  afterModel(model) {
    set(this.page, 'pages', get(model, 'pages'));
  }
});
