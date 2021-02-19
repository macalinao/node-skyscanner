/*global describe, it */
/*jshint -W030 */
"use strict";

var expect = require("chai").expect;
var _ = require("lodash");
var moment = require("moment");
var Skyscanner = require("../");

describe("node-skyscanner", function () {
  this.timeout(10000);
  var s = new Skyscanner();

  describe("getBase", function () {
    it("should have the correct default base URL", function () {
      expect(s.getBase()).to.equal(Skyscanner.BROWSE + "US/USD/en-us/");
    });
    it("should properly set options", function () {
      var sp = new Skyscanner({
        country: "CA",
        currency: "EUR",
        language: "en-gb",
      });
      expect(sp.getBase()).to.equal(Skyscanner.BROWSE + "CA/EUR/en-gb/");
    });
  });

  describe("destinations", function () {
    it("should get destinations", function (done) {
      s.destinations("US", "US").then(function (data) {
        expect(data.Carriers).to.not.be.undefined;
        done();
      });
    });
    it("should error if from is invalid", function (done) {
      s.destinations("2.3.5.41", "US").catch(function (err) {
        expect(err).to.not.be.undefined;
        expect(err.Content).to.match(/2.3.5.41 is not a recognised/);
        done();
      });
    });
    it("should error if to is invalid", function (done) {
      s.destinations("US", "LOLLAND").catch(function (err) {
        expect(err).to.not.be.undefined;
        expect(err.Content).to.match(/LOLLAND is not a recognised/);
        done();
      });
    });
  });

  describe("calendar", function () {
    it("should get calendar", function (done) {
      s.calendar("DFWA", "LHR").then(function (data) {
        expect(data.Carriers).to.not.be.undefined;
        done();
      });
    });
    it("should get calendar if future", function (done) {
      s.calendar("DFWA", "LHR", {
        departureDate: moment().add(4, "M").format("YYYY-MM"),
        returnDate: moment().add(4, "M").format("YYYY-MM"),
      }).then(function (data) {
        expect(data.Carriers).to.not.be.undefined;
        _.each(data.Quotes, function (quote) {
          var diff = moment(
            quote.Outbound_DepartureDate || quote.Inbound_DepartureDate
          ).diff(moment("2015-01-01"), "days");
          expect(diff).to.be.greaterThan(30);
        });
        done();
      });
    });
    it("should error if date is in the past", function (done) {
      s.calendar("DFWA", "LHR", {
        departureDate: moment().subtract(1, "y").format("YYYY-MM"),
        returnDate: moment().subtract(1, "y").format("YYYY-MM"),
      }).catch(function (err) {
        expect(err.Content).to.match(/Month cannot be in the past/);
        done();
      });
    });
    it("should error if from is invalid", function (done) {
      s.calendar("2.3.5.41", "US").catch(function (err) {
        expect(err).to.not.be.undefined;
        expect(err.Content).to.match(/2.3.5.41 is not a recognised/);
        done();
      });
    });
    it("should error if to is invalid", function (done) {
      s.calendar("US", "LOLLAND").catch(function (err) {
        expect(err).to.not.be.undefined;
        expect(err.Content).to.match(/LOLLAND is not a recognised/);
        done();
      });
    });
  });

  describe("autosuggest", function () {
    it("should suggest airports", function (done) {
      s.autosuggest("DFW").then(function (res) {
        expect(
          _.find(res, function (item) {
            return item.PlaceId === "DFW";
          }).PlaceName
        ).to.match(/Dallas/);
        done();
      });
    });
    it("should default English", function (done) {
      s.autosuggest("POS").then(function (res) {
        expect(
          _.find(res, function (item) {
            return item.PlaceId === "POS";
          }).CountryName
        ).to.match(/Trinidad and Tobago/);
        done();
      });
    });
    it("should change language", function (done) {
      s.autosuggest("POS", {
        language: "ES",
      }).then(function (res) {
        expect(
          _.find(res, function (item) {
            return item.PlaceId === "POS";
          }).CountryName
        ).to.match(/Trinidad y Tobago/);
        done();
      });
    });
  });
});
