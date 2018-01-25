import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, set, computed, observer } from '@ember/object';
import DS from 'ember-data';

export default Service.extend({
  router: service(),
  store: service(),
  fastboot: service(),
  headData: service(),

  titleObserver: observer('currentSection.title', 'currentPage.title', function() {
    const sectionTitle = this.get('currentSection.title');
    const pageTitle = this.get('currentPage.title');
    set(this.get('headData'), 'title', `Ember.js - ${sectionTitle}: ${pageTitle}`);
  }),

  waitForPromise(promise) {
    if (this.get('fastboot.isFastBoot')) {
      this.get('fastboot').deferRendering(promise);
    }
  },

  pages: computed('currentVersion', function() {
    return get(this, 'store').query('page', { version: get(this, 'currentVersion') });
  }),

  currentSection: computed('router.currentURL', 'pages.[]', function() {
    let match = get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/([\w-]+)(#[\w_-]+)?/);

    if(match && match[1]) {
      let promise = get(this, 'pages')
        .then((pages) => pages.find((page) => page.id === match[1]));

      this.waitForPromise(promise);

      return DS.PromiseObject.create({
        promise,
      })
    } else if (get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/?$/)){
      let promise = get(this, 'pages')
        .then((pages) => pages.find((page) => page.id === 'index'));

      this.waitForPromise(promise);

      return DS.PromiseObject.create({
        promise,
      })
    }
  }),

  isFirstPage: computed('currentSection', 'currentPage', function() {
    let promise = get(this, 'currentSection').then((currentSection) => {
      // debugger
      let pages = get(currentSection, 'pages');
      if(pages) {
        return get(this, 'currentPage').then((currentPage) => {
          return pages.indexOf(currentPage) === 0
        })
      }
    })

    this.waitForPromise(promise);

    return DS.PromiseObject.create({
      promise,
    });
  }),

  previousPage: computed('currentSection', 'currentPage', function() {
    let promise = get(this, 'currentSection').then((currentSection) => {
      let pages = get(currentSection, 'pages');

      if(pages) {
        return get(this, 'currentPage').then((currentPage) => {
          let currentLocalPage = pages.find((page) => page.url === currentPage.url);
          let index = pages.indexOf(currentLocalPage);

          if (index > 0) {
            return pages[index - 1];
          }
        })
      }
    });

    this.waitForPromise(promise);

    return DS.PromiseObject.create({
      promise,
    })
  }),

  previousSection: computed('currentSection', 'pages.[]', function() {
    let promise = get(this, 'currentSection').then((currentSection) => {
      return get(this, 'pages').then((pages) => {
        if (pages) {
          let page = pages.content.find((content) => content.id === currentSection.id);

          let index = pages.content.indexOf(page);

          if (index > 0) {
            return pages.objectAt(index-1);
          }
        }
      });
    });

    this.waitForPromise(promise);

    return DS.PromiseObject.create({
      promise,
    })
  }),

  currentPage: computed('router.currentURL', 'currentSection.pages', function() {
    let match = get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/([\w-]+)\/?([\w-]+)?\/?(#[\w_-]+)?/);

    let promise = get(this, 'currentSection').then((currentSection) => {
      let pages = get(currentSection, 'pages');

      if(match && match[1]) {
        if (pages) {
          return pages.find((page) => page.url === `${match[1]}/${match[2] || 'index'}`);
        }
      } else if (get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/?(#[\w_-]+)?$/)){
        let pages = get(this, 'currentSection.pages');

        if (pages) {
          return pages.find((page) => page.url === 'index/');
        }
      }
    });

    this.waitForPromise(promise);

    return DS.PromiseObject.create({
      promise,
    })
  }),

  isLastPage: computed('currentSection', 'currentPage', function() {
    let promise = get(this, 'currentSection').then((currentSection) => {
      // debugger
      let pages = get(currentSection, 'pages');
      if(pages) {
        return get(this, 'currentPage').then((currentPage) => {
          return pages.indexOf(currentPage) === (pages.length-1)
        })
      }
    })

    this.waitForPromise(promise);

    return DS.PromiseObject.create({
      promise,
    });
  }),

  nextPage: computed('currentSection', 'currentPage', function() {
    let promise = get(this, 'currentSection').then((currentSection) => {
      let pages = get(currentSection, 'pages');

      if(pages) {
        return get(this, 'currentPage').then((currentPage) => {
          let currentLocalPage = pages.find((page) => page.url === currentPage.url);
          let index = pages.indexOf(currentLocalPage);

          if (index < pages.length-1) {
            return pages[index + 1];
          }
        })
      }
    });

    this.waitForPromise(promise);

    return DS.PromiseObject.create({
      promise,
    });
  }),

  nextSection: computed('currentSection', 'pages.[]', function() {
    let promise = get(this, 'currentSection').then((currentSection) => {
      let pages = get(this, 'pages.content');

      if (pages) {
        let index = pages.indexOf(currentSection);

        if (index < get(pages, 'length') - 1) {
          return pages.objectAt(index + 1);
        }
      }
    });

    this.waitForPromise(promise);

    return DS.PromiseObject.create({
      promise,
    })
  }),

  currentVersion: computed('router.currentURL', function() {
    return get(this, 'router.currentURL').match(/v\d+\.\d+\.\d+/)[0];
  })
});
