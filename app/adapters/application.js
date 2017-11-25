import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    if (requestType === 'queryRecord') {
      return `/${modelName}/${query.version}/${query.path}.json`;
    } else if(requestType === 'query' && modelName === 'page') {
      return `/content/${query.version}/pages.json`;
    }

    return this._super(...arguments);
  },
});
