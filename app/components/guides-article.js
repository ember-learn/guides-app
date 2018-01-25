import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import PageMixin from '../mixins/page';

export default Component.extend(PageMixin, {
  headData: service(),

  tagName: 'article',
  classNames: 'chapter',

  didRender() {

    let nodeList = this.$('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      // console.log(nodeList);
      nodeList.each((index, code) => {
        code.parentNode.classList.add('line-numbers');
      });
    }

    let filenameNodeList = this.$('pre > code[data-filename]');

    if (filenameNodeList) {
      filenameNodeList.each((index, code) => {
        if (code.parentNode.parentNode.classList.contains('filename')) {
          //do nothing
          return;
        }

        let filename = code.attributes['data-filename'].value;
        let match = filename.match(/\.(\w+)$/);

        let ext = '';

        if (match && match[1]) {
          ext = match[1];
        }

        this.$(code.parentNode).wrap(`<div class="filename ${ext}"></div>`);

        this.$(code.parentNode.parentNode).prepend(this.$(`<span>${code.attributes['data-filename'].value}</span>`));
        this.$(code.parentNode.parentNode).prepend('<div class="ribbon"></div>');
      });
    }

    Prism.highlightAll();

    const sectionTitle = this.get('currentSection.title');
    const pageTitle = this.get('currentPage.title');
    set(this.get('headData'), 'title', `Ember.js - ${sectionTitle}: ${pageTitle}`);
  }
});
