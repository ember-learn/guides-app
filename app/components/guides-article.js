import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'article',
  classNames: 'chapter',
  page: service(),
  didRender() {

    let nodeList = this.element.querySelectorAll('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      // console.log(nodeList);
      nodeList.forEach((code) => {
        code.parentNode.classList.add('line-numbers');
      });
    }

    let filenameNodeList = this.element.querySelectorAll('pre > code[data-filename]');

    if (filenameNodeList) {
      filenameNodeList.forEach((code) => {
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

        const wrapper = document.createElement('div');
        wrapper.classList.add('filename', ext);
        code.parentNode.before(wrapper);
        wrapper.append(code.parentNode);

        const filenameElement = document.createElement('span');
        filenameElement.innerHTML = `${code.attributes['data-filename'].value}`;
        code.parentNode.parentNode.insertBefore(filenameElement, code.parentNode.parentNode.firstChild);

        const ribbon = document.createElement('div');
        ribbon.classList.add('ribbon');
        code.parentNode.parentNode.insertBefore(ribbon, code.parentNode.parentNode.firstChild);
      });
    }

    Prism.highlightAll();
  }
});
