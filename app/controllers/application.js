import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import links from 'ember-website-helpers/data/navbar-links';

export default Controller.extend({
  page: service(),
  links,
});

