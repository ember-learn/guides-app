import Component from '@ember/component';
import { inject as service } from '@ember/service';

let replaceAt = (string, index, replace) => {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

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

    filenameNodeList.each((_, codeBlock) => {

      let diffInfo = codeBlock.attributes['data-diff'] ? codeBlock.attributes["data-diff"].value.split(',') : [];

      if (diffInfo.length === 0) {
        return;
      }

      let lines = codeBlock.innerHTML.split('\n');

      diffInfo.forEach(pD => {
        let operator = pD[0];
        let lineNo = +(pD.replace(operator, ''));
        let text = lines[lineNo - 1];
        if (operator === '+') {
          lines[lineNo - 1] = `<span class="diff-insertion"><span class="diff-operator">+</span>${text}</span>`;
        } else {
          lines[lineNo - 1] = `<span class="diff-deletion"><span class="diff-operator">-</span>${text}</span>`;
        }
      });
      codeBlock.innerHTML = lines.join('\n');
    })

  }
});
