import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    const path = params.path.replace(/\/$/, '');

    if (path.endsWith('/index')) {
      return this.transitionTo('version.show', path.replace(/\/index$/, ''))
    }

    const { version } = this.modelFor('version');

    let contentPromise = this.store.queryRecord('content', {
      path,
      version
    })
    .catch((e) => {
      if (['404', '403'].includes(get(e, 'errors.0.status'))) {
        return this.store.queryRecord('content', {
          path: `${path}/index`,
          version
        });
      }
      throw e;
    });

    return hash({
      content: contentPromise,
      pages: get(this, 'store').query('page', { version }),
      path,
    })
  },
});
