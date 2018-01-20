import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    let versionModel = this.modelFor('version');

    let contentPromise = this.store.queryRecord('content', {
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

    return hash({
      content: contentPromise,
      pages: get(this, 'store').query('page', { version: get(versionModel, 'version') })
    })
  },

  actions: {
    didTransition() {
      this._super();
      if(window.scrollTo) {
        window.scrollTo(0,0);
      }
    }
  }
});
