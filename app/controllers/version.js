import Controller, {
  inject as controller,
} from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

function semverCompare (a, b) {
    let pa = a.replace('v', '').split('.').map((num) => parseInt(num, 10));
    let pb = b.replace('v', '').split('.').map((num) => parseInt(num, 10));

    for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) return -1;
        if (nb > na) return 1;
        if (!isNaN(na) && isNaN(nb)) return -1;
        if (isNaN(na) && !isNaN(nb)) return 1;
    }
    return 0;
}

export default Controller.extend({
  page: service(),
  application: controller(),

  versions: computed('application.model.allVersions.[]', function () {
    let allVersions = get(this, 'application.model.allVersions');

    return allVersions.sort(semverCompare)
  }),

  actions: {
    selectVersion(version) {
      this.transitionToRoute('version', version)
    }
  }
});
