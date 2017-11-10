import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { next } from '@ember/runloop';

export default Route.extend({
  model(params) {
    return this.store.findRecord('content', params.path.replace(/\/$/, ''))
    .catch((e) => {
      if (get(e, 'errors.0.status') === "404") {
        return this.store.findRecord('content', `${params.path.replace(/\/$/, '')}/index`)
      }
      throw e;
    });
  },

  afterModel() {
    next(this, () => {
      Prism.highlightAll();
    })
  }
});
