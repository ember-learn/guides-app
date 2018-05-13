import { computed, get, observer, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { next } from '@ember/runloop';
import Service, { inject as service } from '@ember/service';
import { defer } from 'rsvp';


export default Service.extend({
  router: service(),
  fastboot: service(),
  headData: service(),

  titleObserver: observer('metaSection', 'metaPage', function() {
    const sectionTitle = this.metaSection;
    const pageTitle = this.metaPage;

    let deferred = defer();

    if (this.get('fastboot.isFastBoot')) {
      this.fastboot.deferRendering(deferred.promise);
    }

    next(this, function() {
      set(this.headData, 'title', `Ember.js - ${sectionTitle}${pageTitle ? ': ' + pageTitle: ''}`);

      // this is only to make fastboot to wait for us to set the title before rendering
      deferred.resolve("Don't judge me 😭");
    })
  }),

  currentSection: computed('router.currentURL', 'pages.[]', 'content.id', function() {
    let tocSections = this.pages;

    let contentId = get(this, 'content.id');

    if(!tocSections) { return; }

    let section = contentId.split('/')[0]
    let currentSection = tocSections.find((tocSection) => tocSection.id === section);

    return currentSection;
  }),

  metaSection: alias('currentSection.title'),

  /**
   * Find the TOC item that matches the current visible content. This is needed because the title comes
   * from the TOC and not the content. Also we use this to compute nextPage and previousPage
   * @return {Promise} the current page as a POJO
   */
  currentPage: computed('router.currentURL', 'currentSection.pages', 'content.id', function() {
    let currentSection = this.currentSection;

    if(!currentSection) { return; }

    // special case for the index section - there should always be only exactly 1 page in the "index" section
    if (currentSection.id === 'index') {
      return get(currentSection, 'pages')[0];
    }

    let pages = get(currentSection, 'pages');

    return pages.find((page) => page.url === get(this, 'content.id'));
  }),

  metaPage: alias('currentPage.title'),

  currentSectionCurrentPage: computed('currentSection', 'currentPage', function() {
    let currentSection = this.currentSection;

    if(!currentSection) { return; }

    return get(currentSection, 'pages');
  }),

  isFirstPage: computed('currentSectionCurrentPage', function() {

    let pages = this.currentSectionCurrentPage;

    if(pages) {
      return pages.indexOf(this.currentPage) === 0;
    }
  }),

  isLastPage: computed('currentSectionCurrentPage', function() {
    let pages = this.currentSectionCurrentPage;
    if(pages) {
      return pages.indexOf(this.currentPage) === (pages.length-1);
    }
  }),

  previousPage: computed('currentSectionCurrentPage', function() {
    let pages = this.currentSectionCurrentPage;

    if(pages) {
      let currentPageURL = get(this, 'currentPage.url');

      let currentLocalPage = pages.find((page) => page.url === currentPageURL);
      let index = pages.indexOf(currentLocalPage);

      if (index > 0) {
        return pages[index - 1];
      }
    }
  }),

  nextPage: computed('currentSectionCurrentPage', function() {
    let pages = this.currentSectionCurrentPage;

    if(pages) {
      let currentPageURL = get(this, 'currentPage.url');
      let currentLocalPage = pages.find((page) => page.url === currentPageURL);
      let index = pages.indexOf(currentLocalPage);

      if (index < pages.length-1) {
        return pages[index + 1];
      }
    }
  }),

  previousSection: computed('currentSection', 'pages.[]', function() {
    let currentSection = this.currentSection;

    if(!currentSection) { return; }

    let pages = this.pages;

    if (pages) {
      let page = pages.content.find((content) => content.id === currentSection.id);

      let index = pages.content.indexOf(page);

      if (index > 0) {
        return pages.objectAt(index-1);
      }
    }
  }),

  nextSection: computed('currentSection', 'pages.[]', function() {
    let currentSection = this.currentSection;

    if(!currentSection) { return; }

    let pages = this.pages;

    if (pages) {
      let page = pages.content.find((content) => content.id === currentSection.id);

      let index = pages.content.indexOf(page);

      if (index < get(pages, 'length') - 1) {
        return pages.objectAt(index + 1);
      }
    }
  }),
});
