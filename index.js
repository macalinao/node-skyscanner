'use strict';

var P = require('bluebird');
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
Skyscanner.prototype.destinations = function(from, to, opts) {
  opts = opts || {};
  var departureDate = opts.departureDate || 'anytime';
  var returnDate = opts.returnDate || 'anytime';
  var predicate = [
    'destinations',
    from, to, departureDate, returnDate
  ].join('/');
  var url = this.getBase() + predicate + '/?includequotedate=true';
  return new P(function(resolve, reject) {
    return R.get(url).promise().then(function(res) {
      return resolve(res.body);
    }).catch(function(err) {
      return reject(JSON.parse(err.error.text).DebugItems[0]);
    });
  });
};

/**
 * Gets flights for a specific date range.
 */
Skyscanner.prototype.calendar = function(from, to, opts) {
  opts = opts || {};
  var departureDate = opts.departureDate || 'anytime';
  var returnDate = opts.returnDate || 'anytime';
  var predicate = [
    'calendar',
    from, to, departureDate, returnDate
  ].join('/');
  var url = this.getBase() + predicate + '/?includequotedate=true';
  return new P(function(resolve, reject) {
    return R.get(url).promise().then(function(res) {
      return resolve(res.body);
    }).catch(function(err) {
      return reject(JSON.parse(err.error.text).DebugItems[0]);
    });
  });
};


module.exports = Skyscanner;
