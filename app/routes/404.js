import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    const url = this.router.location.formatURL('/404');
    if (window && window.location && window.location.pathname !== url) {
      this.replaceWith('/404');
    }
  }
});
