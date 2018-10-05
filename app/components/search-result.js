import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['ds-suggestion'],

  page: service(),
  sectionTitle: computed('result.path', function() {
    let sectionId = this.result.path.split('/')[0];

    let section = this.page.pages.find((page) => page.id === sectionId);
    return section.title;
  }),

  pageHeading: computed('result._highlightResult.headings.[]', function() {
    return this.result._highlightResult.headings[0];
  }),

  remainingHeadings: computed('result._highlightResult.headings.[]', function() {
    let headings = this.result._highlightResult.headings;
    headings.forEach((heading) => {
        // Remove <em></em> tags and 'Edit Page'
        heading.value = heading.value.replace(/<em>|<\/em>|Edit Page/g, '');
    });

    return headings;
  })
});
