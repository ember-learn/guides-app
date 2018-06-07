import HeadData from 'ember-meta/services/head-data';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

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

    return `${this.page.currentPage.title} - ${this.page.currentSection.title} - Ember Guides`
  }),

  description: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.description', config['ember-meta'].description);
  }),

  slug: computed('routeName', function() {
    if(this.currentRouteModel.id === 'index') {
      return this.page.currentVersion;
    }

    return `${this.page.currentVersion}/${this.currentRouteModel.id.replace(/\/index$/, '')}`;
  }),

  canonical: computed('routeName', function() {
    if (!isEmpty(this.currentRouteModel.canonical)) {
      return this.currentRouteModel.canonical;
    }

    let slug;

    if (this.currentRouteModel.id === 'index') {
      slug = 'release';
    } else {
      slug = `release/${this.currentRouteModel.id.replace(/\/index$/, '')}`
    }

    return `${config['ember-meta'].url}${slug}/`;
  }),
});
