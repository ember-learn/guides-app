import HistoryLocation from '@ember/routing/history-location';

let trailingHistory = HistoryLocation.extend({
  formatURL() {
    let url = this._super(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      return url.replace(/\/?$/, '/');
    }
  }
});

export default {
  name: 'registerTrailingLocationHistory',

  initialize(application) {
    application.register('location:trailing-history', trailingHistory);
  }
};
