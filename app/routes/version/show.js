import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    let versionModel = this.modelFor('version');

    const { version } = versionModel;
    const path = params.path.replace(/\/$/, '');

    let contentPromise = this.store.queryRecord('content', {
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

    return hash({
      content: contentPromise,
      pages: get(this, 'store').query('page', { version })
    })
  },
});
