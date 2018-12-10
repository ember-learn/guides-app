import Controller from '@ember/controller';
import { controller } from '@ember-decorators/controller';
import { get } from '@ember/object';
import { action, computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';

export default class Version extends Controller {
  @service()
  page;

  @controller()
  application;

  @alias('model.pages')
  pages;

  @computed('application.model.allVersions.[]')
  get versions() {
    let allVersions = get(this, 'application.model.allVersions');

    return allVersions.sort(compareVersions).reverse();
  }

  @action
  selectVersion(version) {
    // Navigate to same section/page if it exists
    const path = get(this, 'page.currentPage.url');
    this.store
      .queryRecord('content', { version, path })
      .then(() => {
        this.transitionToRoute(`/${version}/${path}`);
      })
      .catch(() => {
        this.transitionToRoute('version', version);
      });
  }
}
