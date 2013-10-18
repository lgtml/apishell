/* node: true */
"use strict";

var prompt = require('prompt');
var optimist = require('optimist');

function Prompts (name) {
  /* Allow Arg Override */
  prompt.override = optimist.argv;

  /* Set Custom Prompt */
  this.defaultDelimeter = " > ";
  this.defaultMessage = name || "API";
  prompt.delimiter = this.defaultDelimeter.green;
  prompt.message = this.defaultMessage.yellow;

}

Prompts.prototype = Object.create(Prompts);

Prompts.prototype.auth = function (user_key, password_key, cb) {
  var authSchema = {
    properties: { }
  };

  authSchema.properties[user_key] = {
        "pattern": /^[a-zA-Z\s\-]+$/,
        "required": true
      };

  authSchema.properties[password_key] = {
        "message": password_key.red,
        "hidden": true
    };

 prompt.get(authSchema, cb);

};

Prompts.prototype.shell = function(cb) {
    var shellSchema = {
      properties: {
        "cmd": {
          "message": null
        }
      }
    };

    prompt.get(shellSchema, function (err, results) {

      if (err) {
        cb(err, null);
      } else {
        var cmdArr = results.cmd.split(' ');
        var cmd = cmdArr.slice(0,1)[0];
        var parsedResults = {
          "cmd": cmd
        };

        if (cmdArr.length > 1) {
          try {
            var payLoad = null;
            payLoad = JSON.parse(cmdArr.slice(1).join(' '));

          } catch (err) {
            console.error('Could not parse JSON Body');
          } finally {
            parsedResults.payLoad = payLoad;
          }

        }

        cb(null, parsedResults);
      }
    });
};


module.exports = Prompts;
