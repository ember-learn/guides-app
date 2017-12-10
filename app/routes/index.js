import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    this.transitionTo('version', 'v2.16.0');
  }
});
