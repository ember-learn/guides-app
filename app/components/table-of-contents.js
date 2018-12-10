import { className, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

@tagName('ol')
export default class TableOfContents extends Component {
  @service()
  fastboot;

  level = '0';

  @computed('level')
  @className
  get tocLevel() {
    return `toc-level-${this.level}`;
  }
}
