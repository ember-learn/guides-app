import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    return hash({
      pages: this.store.query('page', {version: params.version}),
      version: params.version,
    });
  }
});
