import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'article',
  classNames: 'chapter',
  page: service(),
  didRender() {
    this._addLineNumbers();
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

        let preNode = code.parentNode;

        this._wrapCodeBlock(preNode, ext);
        this._addFilename(preNode, filename);
        this._addRibbon(preNode);
      });
    }

    this._addLinkAnchors();
    this._addSymbolsAndHighlight(filenameNodeList);
  },

  // private
  _addLineNumbers() {
    let nodeList = this.element.querySelectorAll('pre:not(.no-line-numbers) > code');

    if (nodeList.length) {
      nodeList.forEach((code) => {
        code.parentNode.classList.add('line-numbers');
      });
    }
  },

  _wrapCodeBlock(preNode, ext) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('filename', ext);
    preNode.parentNode.insertBefore(wrapper, preNode);
    wrapper.appendChild(preNode);
  },

  _addFilename(preNode, filename) {
    let span = document.createElement('span');
    span.textContent = filename;
    preNode.parentNode.insertBefore(span, preNode);
  },

  _addRibbon(preNode) {
    let div = document.createElement('span');
    div.classList.add('ribbon');
    preNode.parentNode.insertBefore(div, preNode);
  },

  _addLinkAnchors() {
    let allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6")

    for (var element of allHeaders) {
      if (element.id) {
        element.className = 'anchorable-toc'
        let link = document.createElement('a');
        link.className = 'toc-anchor';
        link.href = `#${element.id}`;
        element.insertBefore(link, element.firstElementChild);
      }
    }
  },

  /**
   * Prism doesn't support diff & a secondary language highlighting.
   *
   * So first, we let prism convert the content of `<code></code>` blocks
   * from a string into a different dom structure
   * by calling `Prism.highlightAll()`
   *
   * In the following block, we add + & - symbols to the lines inside the
   * code block based on the data-diff attribute on the code tag.
   * e.g., data-diff="-4,+5,+6,+7"
   *
   **/

  _addSymbolsAndHighlight(filenameNodeList) {
    Prism.highlightAll();
    filenameNodeList.forEach((codeBlock) => {

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
    });
  }
});
