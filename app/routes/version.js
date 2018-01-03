import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
  model(params) {
    let applicationModel = this.modelFor('application');
    
    return hash({
      pages: this.store.query('page', {version: params.version}),
      allVersions: get(applicationModel, 'allVersions'),
      version: params.version,
    });
  }
});
