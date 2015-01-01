/*global describe, it */
'use strict';

var expect = require('chai').expect;
var Skyscanner = require('../');

describe('skyscanner node module', function() {
  this.timeout(10000);
  var s = new Skyscanner();

  describe('getBase', function() {
    it('should have the correct default base URL', function() {
      expect(s.getBase()).to.equal(Skyscanner.BASE + 'US/USD/en-us/');
    });
    it('should properly set options', function() {
      var sp = new Skyscanner({
        country: 'CA',
        currency: 'EUR',
        language: 'en-gb'
      });
      expect(sp.getBase()).to.equal(Skyscanner.BASE + 'CA/EUR/en-gb/');
    });
  });

  describe('destinations', function() {
    it('should get destinations', function(done) {
      s.destinations('US', 'US').then(function(data) {
        expect(data.Carriers).to.not.be.undefined;
        done();
      }).catch(done);
    });
    it('should error if from is invalid', function(done) {
      s.destinations('2.3.5.41', 'US').catch(function(err) {
        expect(err).to.not.be.undefined;
        expect(JSON.parse(err.error.text).DebugItems[0].Content).to.match(/2.3.5.41 is not a recognised/);
        done();
      });
    });
    it('should error if to is invalid', function(done) {
      s.destinations('US', 'LOLLAND').catch(function(err) {
        expect(err).to.not.be.undefined;
        expect(JSON.parse(err.error.text).DebugItems[0].Content).to.match(/LOLLAND is not a recognised/);
        done();
      });
    });
  });

});
