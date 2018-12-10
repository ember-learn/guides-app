import { get, set } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';
import { hash } from 'rsvp';

export default class Version extends Route {
  @service()
  page;

  model(params) {
    let applicationModel = this.modelFor('application');
    let currentVersion = get(applicationModel, 'currentVersion');
    let version = params.version;

    if (params.version === 'release') {
      version = currentVersion;
    }

    return hash({
      pages: this.store.query('page', { version }),
      allVersions: get(applicationModel, 'allVersions'),
      currentVersion,
      version: version
    });
  }

  afterModel(model) {
    set(this.page, 'pages', get(model, 'pages'));
  }
}
