import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import DS from 'ember-data';

export default Service.extend({
  router: service(),
  store: service(),
  pages: computed('currentVersion', function() {
    return get(this, 'store').query('page', { version: get(this, 'currentVersion') });
  }),

  currentSection: computed('router.currentURL', 'pages.[]', function() {
    let match = get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/([\w-]+)/);

    if(match && match[1]) {
      let promise = get(this, 'pages')
        .then((pages) => pages.find((page) => page.id === match[1]));

      return DS.PromiseObject.create({
        promise,
      })
    } else if (get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/?$/)){
      let promise = get(this, 'pages')
        .then((pages) => pages.find((page) => page.id === 'index'));

      return DS.PromiseObject.create({
        promise,
      })
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
    let promise = get(this, 'currentSection').then((currentSection) => {
      let pages = get(this, 'pages.content');

      if (pages) {
        let index = pages.indexOf(currentSection);

        if (index > 0) {
          return pages.objectAt(index-1);
        }
      }
    });

    return DS.PromiseObject.create({
      promise,
    })
  }),

  currentPage: computed('router.currentURL', 'currentSection.pages', function() {
    let match = get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/([\w-/]+)/);

    if(match && match[1]) {
      let pages = get(this, 'currentSection.pages');

      if (pages) {
        return pages.find((page) => page.url === match[1]);
      }
    } else if (get(this, 'router.currentURL').match(/^\/v\d+\.\d+\.\d+\/?$/)){
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
    let promise = get(this, 'currentSection').then((currentSection) => {
      let pages = get(this, 'pages.content');

      if (pages) {
        let index = pages.indexOf(currentSection);

        if (index < get(pages, 'length') - 1) {
          return pages.objectAt(index + 1);
        }
      }
    });

    return DS.PromiseObject.create({
      promise,
    })
  }),

  currentVersion: computed('router.currentURL', function() {
    return get(this, 'router.currentURL').match(/v\d+\.\d+\.\d+/)[0];
  })
});
