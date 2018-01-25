import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'footer',

  page: service(),

  nextSectionPage: computed('page.nextSection.pages.[]', function() {
    let pages = get(this, 'page.nextSection.pages');

    if(pages && pages.length) {
      return pages[0];
    }
  }),
  previousSectionPage: computed('page.previousSection.pages.[]', function() {
    let pages = get(this, 'page.previousSection.pages');

    if(pages && pages.length) {
      return pages[pages.length - 1];
    }
  })
});
