import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  fastboot: service(),

  level: '0',
  tagName: 'ol',
  tocLevel: computed('level', function() {
    return `toc-level-${get(this, 'level')}`;
  }),
  classNameBindings: ['tocLevel'],
});
