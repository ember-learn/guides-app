import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { next } from '@ember/runloop';

export default Route.extend({
  model(params) {
    let versionModel = this.modelFor('version');

    return this.store.queryRecord('content', {
      path: params.path.replace(/\/$/, ''),
      version: versionModel.version,
    })
    .catch((e) => {
      if (get(e, 'errors.0.status') === "404") {
        return this.store.queryRecord('content', {
          path: `${params.path.replace(/\/$/, '')}/index`,
          version: versionModel.version,
        });
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
