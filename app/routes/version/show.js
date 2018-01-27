import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  page: service(),
  model(params) {
    const path = params.path.replace(/\/$/, '');

    if (path === 'index') {
      return this.transitionTo('version');
    }

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
      version
    })
  },
  afterModel(model) {
    let content = get(model, 'content');
    set(get(this, 'page'), 'content', content);
    let version = get(model, 'version');
    set(get(this, 'page'), 'currentVersion', version);
  }
});
