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

    let allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6")

    for (var element of allHeaders) {
      if (element.id) {
        element.className = 'anchorable-toc'
        let link = document.createElement('a');
        link.className = 'toc-anchor';
        link.href = `#${element.id}`;
        element.prepend(link)
      }
    }

    Prism.highlightAll();
  }
});
