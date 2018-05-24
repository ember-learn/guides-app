import EmberRouter from '@ember/routing/router';

import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  metrics: service(),
  fastboot: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    if(get(this, 'fastboot.isFastBoot')) {
      return;
    }

    scheduleOnce('afterRender', this, () => {
      const page = this.url;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      // this is constant for this app and is only used to identify page views in the GA dashboard
      const hostname = 'guides.emberjs.com';

      this.metrics.trackPage({ page, title, hostname });
    });
  },
});

Router.map(function() {
  this.route('version', { path: ':version' }, function() {
    this.route('show', { path: '*path' });
  });
});

export default Router;
