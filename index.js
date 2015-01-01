'use strict';

require('bluebird');
var R = require('superagent');
require('superagent-bluebird-promise');

var BASE = 'http://www.skyscanner.com/dataservices/browse/v1.1/';

function Skyscanner(opts) {
  opts = opts || {};
  this.country = opts.country || 'US';
  this.currency = opts.currency || 'USD';
  this.language = opts.language || 'en-us';
}

Skyscanner.BASE = BASE;

/**
 * Gets the base URL of the API.
 */
Skyscanner.prototype.getBase = function() {
  return BASE + this.country + '/' + this.currency + '/' + this.language + '/';
};

/**
 * Gets destinations.
 */
Skyscanner.prototype.destinations = function(from, to) {
  var url = this.getBase() + 'destinations/' + from + '/' + to + '/anytime/anytime/?includequotedate=true';
  return R.get(url).promise().then(function(res) {
    return res.body;
  });
};

module.exports = Skyscanner;
