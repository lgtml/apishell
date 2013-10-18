/* node: true */
"use strict";

var prompts = require('./prompts');
var apiPrompt = new prompts('https://api.goinstant.com');

apiPrompt.auth('client_id','secret', function(err, results) {
  if (err) {
    console.error('ERROR', err);
  } else {
    console.log('RESULTS', results);
    apiPrompt.shell(resultHandler);
  }
});

function resultHandler (err, results) {
  if (err) {
    console.error('ERROR', err.message);

  } else {
    console.log('CMD', results);
    apiPrompt.shell(resultHandler);

  }

}

