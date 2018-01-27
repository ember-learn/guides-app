import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
  model(params) {
    let applicationModel = this.modelFor('application');
    let version;
    if (params.version === 'current') {
      version = get(applicationModel, 'currentVersion');
    } else {
      version = params.version;
    }
    return hash({
      pages: this.store.query('page', {version}),
      allVersions: get(applicationModel, 'allVersions'),
      version: version,
    });
  }
});
