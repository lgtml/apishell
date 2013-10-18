/* node: true */
"use strict";

var prompts = require('./prompts');
var configLib = require('./config.js');

configLib.LoadConfig(function(err, config) {

  var apishell = new prompts(config.url);

  auth(apishell);

});

function auth(apishell) {
  apishell.auth('client_id','secret', function(err, results) {
    if (err) {
      console.error('Error failed to get credentials');
    } else {
      _doAuth(results, function(err, token) {
        if (err) {
          console.error('Failed to Authenticate');
          auth(apishell);
        } else {
          startSession(token);
        }
      });
    }
  });
}

function _doAuth(results, cb) {
  /* Send request to api */
  var token = 'test token';

  cb(null, token);

}

function startSession(token) {
  console.log('success', token);
}
