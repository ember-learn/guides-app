import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, set, computed, observer } from '@ember/object';

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

  currentSection: computed('router.currentURL', 'pages.[]', 'content.id', function() {
    let tocSections = get(this, 'pages');

    let contentId = get(this, 'content.id');

    if(!tocSections) { return; }

    let section = contentId.split('/')[0]
    return tocSections.find((tocSection) => tocSection.id === section)
  }),

  /**
   * Find the TOC item that matches the current visible content. This is needed because the title comes
   * from the TOC and not the content. Also we use this to compute nextPage and previousPage
   * @return {Promise} the current page as a POJO
   */
  currentPage: computed('router.currentURL', 'currentSection.pages', 'content.id', function() {
    let currentSection = get(this, 'currentSection');

    if(!currentSection) { return; }

    // special case for the index section - there should always be only exactly 1 page in the "index" section
    if (currentSection.id === 'index') {
      return get(currentSection, 'pages')[0];
    }

    let pages = get(currentSection, 'pages');

    return pages.find((page) => page.url === get(this, 'content.id'));
  }),

  isFirstPage: computed('currentSection', 'currentPage', function() {
    let currentSection = get(this, 'currentSection');

    if(!currentSection) { return; }

    let pages = get(currentSection, 'pages');
    if(pages) {
      return pages.indexOf(get(this, 'currentPage')) === 0
    }
  }),

  isLastPage: computed('currentSection', 'currentPage', function() {
    let currentSection = get(this, 'currentSection');

    if(!currentSection) { return; }

    let pages = get(currentSection, 'pages');
    if(pages) {
      return pages.indexOf(get(this, 'currentPage')) === (pages.length-1)
    }
  }),

  previousPage: computed('currentSection', 'currentPage', function() {
    let currentSection = get(this, 'currentSection');

    if(!currentSection) { return; }

    let pages = get(currentSection, 'pages');

    if(pages) {
      let currentPage = get(this, 'currentPage');

      let currentLocalPage = pages.find((page) => page.url === currentPage.url);
      let index = pages.indexOf(currentLocalPage);

      if (index > 0) {
        return pages[index - 1];
      }
    }
  }),

  nextPage: computed('currentSection', 'currentPage', function() {
    let currentSection = get(this, 'currentSection');

    if(!currentSection) { return; }

    let pages = get(currentSection, 'pages');

    if(pages) {
      let currentPage = get(this, 'currentPage');
      let currentLocalPage = pages.find((page) => page.url === currentPage.url);
      let index = pages.indexOf(currentLocalPage);

      if (index < pages.length-1) {
        return pages[index + 1];
      }
    }
  }),

  previousSection: computed('currentSection', 'pages.[]', function() {
    let currentSection = get(this, 'currentSection');

    if(!currentSection) { return; }

    let pages = get(this, 'pages');

    if (pages) {
      let page = pages.content.find((content) => content.id === currentSection.id);

      let index = pages.content.indexOf(page);

      if (index > 0) {
        return pages.objectAt(index-1);
      }
    }
  }),

  nextSection: computed('currentSection', 'pages.[]', function() {
    let currentSection = get(this, 'currentSection');

    if(!currentSection) { return; }

    let pages = get(this, 'pages');

    if (pages) {
      let page = pages.content.find((content) => content.id === currentSection.id);

      let index = pages.content.indexOf(page);

      if (index < get(pages, 'length') - 1) {
        return pages.objectAt(index + 1);
      }
    }
  }),
});
