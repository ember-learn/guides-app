import Service from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Service.extend({
  _codeStyles: null,
  codeStyle: null,

  codeStyles: readOnly('_codeStyles'),

  init() {
    this._super();
    this._codeStyles = [
      {
        name: 'Ember Traditional',
        mdStyle: 'ember'
      },
      {
        name: 'ES6',
        mdStyle: 'es6'
      }
    ];

    this.codeStyle = this._codeStyles[0];
  }
});
