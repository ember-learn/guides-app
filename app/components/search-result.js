import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

@classNames('ds-suggestion')
export default class SearchResult extends Component {
  @service()
  page;

  @computed('result.path')
  get sectionTitle() {
    let sectionId = this.result.path.split('/')[0];

    let section = this.page.pages.find(page => page.id === sectionId);
    return section.title;
  }

  @computed('result._highlightResult.headings.[]')
  get pageHeading() {
    return this.result._highlightResult.headings[0];
  }

  @computed('result._highlightResult.headings.[]')
  get remainingHeadings() {
    return this.result._highlightResult.headings;
  }
}
