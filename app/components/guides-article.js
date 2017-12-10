import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'article',
  classNames: 'chapter',

  page: service(),

  didRender() {

    let nodeList = this.$('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      // console.log(nodeList);
      nodeList.each((index, code) => {
        code.parentNode.classList.add("line-numbers")
      });
    }

    let filenameNodeList = this.$('pre > code[data-filename]');

    if (filenameNodeList) {
      filenameNodeList.each((index, code) => {
        if(code.parentNode.parentNode.classList.contains('filename')) {
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
  }
});
