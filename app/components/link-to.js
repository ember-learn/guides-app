import Ember from 'ember';

export default Ember.LinkComponent.extend({
  click() {
    if(window.scrollTo) {
      window.scrollTo(0,0);
    }
  }
});
