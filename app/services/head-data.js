import HeadData from 'ember-meta/services/head-data';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default HeadData.extend({
  page: service(),
  currentRouteModel: computed('routeName', function() {
    return getOwner(this).lookup(`route:${this.get('routeName')}`).get('currentModel.content');
  }),

  title: computed('routeName', function() {
    if(!this.page.currentPage || !this.page.currentSection) {
      return 'Ember Guides';
    }
  }),

  description: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.description', config['ember-meta'].description);
  }),

  slug: computed('routeName', function() {
    return `release/${this.get('currentRouteModel.id').replace(/\/index$/, '')}`;
  })
});
