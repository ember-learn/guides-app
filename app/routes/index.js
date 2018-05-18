import Route from '@ember/routing/route';

export default Route.extend({
  redirect(_model, transition) {
    if (transition.intent.url === '/') {
      this.transitionTo('version', 'release');
    } else {
      window.location.href='https://emberjs.com/';
    }
  }
});
