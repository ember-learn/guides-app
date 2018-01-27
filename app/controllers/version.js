import Controller, {
  inject as controller,
} from '@ember/controller';
import { get, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  page: service(),
  application: controller(),

  pages: alias('model.pages'),

  versions: computed('application.model.allVersions.[]', function () {
    let allVersions = get(this, 'application.model.allVersions');

    return allVersions.sort(compareVersions).reverse();
  }),

  actions: {
    selectVersion(version) {
      this.transitionToRoute('version', version)
    }
  }
});
