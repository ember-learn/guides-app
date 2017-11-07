import DS from 'ember-data';
import { pluralize } from 'ember-inflector';
import { decamelize } from '@ember/string';

export default DS.JSONAPIAdapter.extend({
  buildURL(type) {
    if(type === 'page') {
      return `/content/pages.json`;
    }

    return `${this._super(...arguments)}.json`;
  },

  pathForType: function(modelName) {
    if (modelName === 'content' || modelName === 'page') {
      return 'content';
    }

    var decamelized = decamelize(modelName);
    return pluralize(decamelized);
  }
});
