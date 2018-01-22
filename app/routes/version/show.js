import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { next } from '@ember/runloop';

export default Route.extend({
  model(params) {
    let versionModel = this.modelFor('version');

    const { version } = versionModel;
    const path = params.path.replace(/\/$/, '');

    return this.store.queryRecord('content', {
      path,
      version
    })
    .catch((e) => {
      if (get(e, 'errors.0.status') === "404") {
        return this.store.queryRecord('content', {
          path: `${path}/index`,
          version
        });
      }
      throw e;
    });    
  },

  afterModel() {
    next(this, () => {
      Prism.highlightAll();
    });
  },

  actions: {
    didTransition() {
      this._super();
      window.scrollTo(0, 0);
    }
  }
});
