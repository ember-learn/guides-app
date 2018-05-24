import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, setProperties } from '@ember/object';

export default Route.extend({
  headData: service(),

  classNames: ['x404'],

  setupController(controller, error) {
    const errorCode = get(error, 'errors.0.status');
    let errorMessage = 'Error';

    if (errorCode === '404') {
      errorMessage = '404 - Not Found';
    }

    return setProperties(this.headData, {
      title: `Ember.js - ${errorMessage}`
    });
  }
});
