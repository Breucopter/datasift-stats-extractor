'use strict';

var nconf = require('nconf'),
  path = require('path'),
  fs = require('fs'),
  configPath = path.resolve(__dirname, '../config.json');

function refresh() {
  nconf.argv()
    .env();

  if(fs.existsSync(configPath)) {
    nconf.file({ file: configPath });
  }
}

//load initially
refresh();

exports.get = function(key) {
  return nconf.get(key);
};

exports.set = function(key, value) {
  nconf.set(key, value);
};

exports.refresh = refresh;