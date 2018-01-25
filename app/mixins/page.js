import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { get, set, computed, observer } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Mixin.create({
  router: service(),
  headData: service(),

  titleObserver: observer('router.currentURL', function() {
    if (isEmpty(get(this, 'router.currentURL'))) {
      return;
    }
    const sectionTitle = this.get('currentSection.title');
    const pageTitle = this.get('currentPage.title');

    set(this.get('headData'), 'title', `Ember.js - ${sectionTitle}: ${pageTitle}`);
  }),

  currentSection: computed('router.currentURL', 'pages.[]', function() {
    let match = get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/([\w-]+)(#[\w_-]+)?/);

    if(match && match[1]) {
      return get(this, 'pages').find((page) => page.id === match[1]);

    } else if (get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/?(#[\w_-]+)?$/)){
      return get(this, 'pages').find((page) => page.id === 'index');
    }
  }),

  isFirstPage: computed('currentSection', 'currentPage', function() {
    let pages = get(this, 'currentSection.pages');

    if(pages) {
      return pages.indexOf(get(this, 'currentPage')) === 0;
    }
  }),

  previousPage: computed('currentSection', 'currentPage', function() {
    let pages = get(this, 'currentSection.pages');

    if(pages) {
      let index = pages.indexOf(get(this, 'currentPage'));

      if (index > 0) {
        return pages[index - 1];
      }
    }
  }),

  previousSection: computed('currentSection', 'pages.[]', function() {
    let currentSection = get(this, 'currentSection');
    let pages = get(this, 'pages');

    if (pages) {
      let index = pages.indexOf(currentSection);

      if (index > 0) {
        return pages.objectAt(index-1);
      }
    }
  }),

  currentPage: computed('router.currentURL', 'currentSection.pages', function() {
    let match = get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/([\w-]+)\/?([\w-]+)?\/?(#[\w_-]+)?/);

    if(match && match[1]) {
      let pages = get(this, 'currentSection.pages');

      if (pages) {
        return pages.find((page) => page.url === `${match[1]}/${match[2]}`);
      }
    } else if (get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/?(#[\w_-]+)?$/)){
      let pages = get(this, 'currentSection.pages');

      if (pages) {
        return pages.find((page) => page.url === 'index/');
      }
    }
  }),

  isLastPage: computed('currentSection', 'currentPage', function() {
    let pages = get(this, 'currentSection.pages');

    if(pages) {
      return pages.indexOf(get(this, 'currentPage')) === (pages.length-1);
    }
  }),

  nextPage: computed('currentSection', 'currentPage', function() {
    let pages = get(this, 'currentSection.pages');

    if(pages) {
      let index = pages.indexOf(get(this, 'currentPage'));

      if (index < pages.length-1) {
        return pages[index + 1];
      }
    }
  }),

  nextSection: computed('currentSection', 'pages.[]', function() {
    let currentSection = get(this, 'currentSection')
    let pages = get(this, 'pages');

    if (pages) {
      let index = pages.indexOf(currentSection);

      if (index < get(pages, 'length') - 1) {
        return pages.objectAt(index + 1);
      }
    }
  }),

  currentVersion: computed('router.currentURL', function() {
    return get(this, 'router.currentURL').match(/v\d+\.\d+\.\d+/)[0];
  })
});
