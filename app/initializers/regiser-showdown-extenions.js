// app/initializers/register-showdown-extensions.js
import showdown from 'showdown';

export function initialize() {
  showdown.subParser('ellipsis', function (text, options, globals) {
    text = globals.converter._dispatch('ellipsis.before', text, options, globals);
    text = globals.converter._dispatch('ellipsis.after', text, options, globals);
    return text;
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
