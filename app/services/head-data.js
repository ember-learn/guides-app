import HeadData from 'ember-meta/services/head-data';
import { computed } from '@ember-decorators/object';
import { getOwner } from '@ember/application';
import { service } from '@ember-decorators/service';
import { isPresent } from '@ember/utils';

import config from '../config/environment';

export default class HeadDataEmberObject extends HeadData {
  @service()
  page;

  @computed('routeName')
  get currentRouteModel() {
    return getOwner(this)
      .lookup(`route:${this.routeName}`)
      .get('currentModel.content');
  }

  @computed('routeName')
  get title() {
    if (!this.page.currentPage || !this.page.currentSection) {
      return 'Ember Guides';
    }

    return `${this.page.currentPage.title} - ${
      this.page.currentSection.title
    } - Ember Guides`;
  }

  @computed('routeName')
  get description() {
    return this.getWithDefault(
      'currentRouteModel.description',
      config['ember-meta'].description
    );
  }

  @computed('routeName')
  get slug() {
    // if there is no current model
    if (!this.currentRouteModel) {
      return null;
    }

    if (this.currentRouteModel.id === 'index') {
      return this.page.currentVersion;
    }

    return `${this.page.currentVersion}/${this.currentRouteModel.id.replace(
      /\/index$/,
      ''
    )}`;
  }

  @computed('routeName')
  get canonical() {
    // if there is no current model
    if (!this.currentRouteModel) {
      return null;
    }

    if (isPresent(this.currentRouteModel.canonical)) {
      return this.currentRouteModel.canonical;
    }

    let slug;

    if (this.currentRouteModel.id === 'index') {
      slug = 'release';
    } else {
      slug = `release/${this.currentRouteModel.id.replace(/\/index$/, '')}`;
    }

    return `${config['ember-meta'].url}${slug}/`;
  }
}
