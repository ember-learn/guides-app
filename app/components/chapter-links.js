import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { get } from '@ember/object';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

@tagName('footer')
export default class ChapterLinks extends Component {
  @service()
  page;

  @computed('page.nextSection.pages.[]')
  get nextSectionPage() {
    let pages = get(this, 'page.nextSection.pages');

    if (pages && pages.length) {
      return pages[0];
    }
  }

  @computed('page.previousSection.pages.[]')
  get previousSectionPage() {
    let pages = get(this, 'page.previousSection.pages');

    if (pages && pages.length) {
      return pages[pages.length - 1];
    }
  }
}
