import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  redirect() {
    this.transitionTo('version', get(this.modelFor('application'), 'currentVersion'));
  }
});
