import showdown from 'showdown';

export function initialize() {

  // Prism.languages.bash.function.pattern = new RegExp(Prism.languages.bash.function.pattern.toString().replace('|npm|', '|ember|npm|generate|').replace('|install|', '|'));
  // Prism.languages.shell.function.pattern = Prism.languages.bash.function.pattern;

  showdown.subParser('ellipsis', (text, options, globals) => {
    let newText = text;
    newText = globals.converter._dispatch('ellipsis.before', newText, options, globals);
    newText = globals.converter._dispatch('ellipsis.after', newText, options, globals);
    return newText;
  });


  showdown.subParser('githubCodeBlocks', (textPassed, options, globals) => {

    let text = textPassed;

    // early exit if option is not enabled
    if (!options.ghCodeBlocks) {
      return text;
    }

    text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

    text += '¨0';

    text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,  (wholeMatch, languageBlock, codeBlock) => {
      let end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

      // First parse the github code block
      codeBlock = showdown.subParser('encodeCode')(codeBlock, options, globals);
      codeBlock = showdown.subParser('detab')(codeBlock, options, globals);
      codeBlock = codeBlock.replace(/^\n+/g, ''); // trim leading newlines
      codeBlock = codeBlock.replace(/\n+$/g, ''); // trim trailing whitespace

      let hasDiff = languageBlock.indexOf('data-diff') !== -1;

      let match = languageBlock.match(/(\w+)(\s+{(.*)})?/);
      let languageString = '';
      let attributeString = '';

      if(match && match[1]) {
        languageString = match[1] + ' language-' + match[1];
        if (hasDiff) {
          languageString += ' diff language-diff';
        }
        languageString = ` class="${languageString}"`
      }

      if (match && match[3]) {
        attributeString = match[3];
      }

      codeBlock = '<pre><code' + languageString + attributeString + '>' + codeBlock + end + '</code></pre>';

      codeBlock = showdown.subParser('hashBlock')(codeBlock, options, globals);

      // Since GHCodeblocks can be false positives, we need to
      // store the primitive text and the parsed text in a global var,
      // and then return a token
      return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeBlock}) - 1) + 'G\n\n';
    });

    // attacklab: strip sentinel
    text = text.replace(/¨0/, '');

    return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
