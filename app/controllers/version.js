import Controller, {
  inject as controller,
} from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

export default Controller.extend({
  page: service(),
  application: controller(),

  versions: computed('application.model.allVersions.[]', function () {
    let allVersions = get(this, 'application.model.allVersions');

    return allVersions.sort(compareVersions);
  }),

  actions: {
    selectVersion(version) {
      this.transitionToRoute('version', version)
    }
  }
});
