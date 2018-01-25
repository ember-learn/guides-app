import Component from '@ember/component';
import { get, computed } from '@ember/object';

import PageMixin from '../mixins/page';

export default Component.extend(PageMixin, {
  tagName: 'footer',

  nextSectionPage: computed('nextSection.pages.[]', function() {
    let pages = get(this, 'nextSection.pages');

    if(pages && pages.length) {
      return pages[0];
    }
  }),
  previousSectionPage: computed('previousSection.pages.[]', function() {
    let pages = get(this, 'previousSection.pages');

    if(pages && pages.length) {
      return pages[pages.length - 1];
    }
  })
});
