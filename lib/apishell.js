/* node: true */
"use strict";

require('js-yaml');

var configFile = process.env['APISHELL_CONFIG'] || '../config/config.yaml';
var config = require(configFile);

