import DS from 'ember-data';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';
import { get } from '@ember/object';

export default DS.JSONAPIAdapter.extend(AdapterFetch, {
  ajaxOptions() {
    const options = this._super(...arguments) || {};
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/vnd.api+json';
    return options;
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    let url;

    if (requestType === 'queryRecord') {
      url = [modelName, query.version, `${query.path}.json`];
    } else if(requestType === 'query' && modelName === 'page') {
      url = ['content', query.version, 'pages.json'];
    } else {
      return this._super(...arguments);
    }

    let host = get(this, 'host');
    let prefix = this.urlPrefix();

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;
  },
});
