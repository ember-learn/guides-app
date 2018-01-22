import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findRecord('version', 'versions');
  },
  actions: {
    error(error) {
      if(error.errors[0].status === '404') {
        this.replaceWith('/404');
      }
    }
  }
});
