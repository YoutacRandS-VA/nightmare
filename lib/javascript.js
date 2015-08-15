/**
 * Module Dependencies
 */

var minstache = require('minstache');

/**
 * Run the `src` on the client-side, capture
 * the response and logs, and send back via
 * ipc to electron's main process
 */

var javascript = [
  "(function javascript () {",
  "  var log = console.log;",
  "  var ipc = require('ipc');",
  "  var sliced = require('sliced')",
  "  console.log = function() {",
  "    ipc.send('log', sliced(arguments));",
  "  }",
  "  try {",
  "    var response = ({{src}})({{!args}})",
  "    ipc.send('response', response);",
  "  } catch (e) {",
  "    ipc.send('error', e.message);",
  "  }",
  "  console.log = log;",
  "})()"
].join("\n");

/**
 * Export the template
 */

module.exports = minstache.compile(javascript);