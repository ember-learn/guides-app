import ApplicationAdapter from './application';
import { get } from '@ember/object'

export default ApplicationAdapter.extend({
  buildURL() {
    let url = ['content', 'versions.json'];
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
