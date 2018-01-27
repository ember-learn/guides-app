import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('current');
  this.route('version', { path: ':version' }, function() {
    this.route('show', { path: '*path' });
  });
});

export default Router;
