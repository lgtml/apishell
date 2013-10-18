"use strict";

require('js-yaml');

var fs = require('fs');
var configFile = process.env['APISHELL_CONFIG'] || '../config/config.yaml';

var config = exports;

config.LoadConfig = LoadConfig;

function LoadConfig(cb) {
  fs.exists(configFile, function(exists) {
    if (!exists) {
      var err = 'Config' + configFile +'does not exist';
      console.error(err);

      return cb(err, null);

    }
    console.log('Loading ', configFile);
    var config = require(configFile);

    _validate(config, cb);
  });
}

function _validate(config, cb) {
  var err = [];
  if (!config.url) {
    err.push('Url required');
  }

  if (!config.auth) {
    err.push("Auth Section Required");
  }

  if (err.length > 0) {
    return cb(err, null);
  }

  config.auth.type = config.auth.type || 'oauth';
  cb(null, config);
}
