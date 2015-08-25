"use strict";

/* Feature: Rest: Add Atlassian Bamboo support */
module.exports = (function testSuite() {
  var English = require("yadda").localisation.English;
  var assert = require("assert");
  var rest = require("../..").rest;
  var config = require("../..").config;
  return English.library()
    /*Scenario: Bamboo GET rest query */
    .define("Given I have an access token for my Bamboo server", function test(done) {
      assert(config("bamboo").oauth.access_token !== "");
      done();
    })
    .define("When I perform a build plan get", function test(done) {
      var self = this;
      rest({
          "config": config("bamboo"),
          "query": "plan.json"
        },
        function restCallback(error, data) {
          assert(!error);
          self.world.allPlans = data;
          done();
        });
    })
    .define("Then build plans are returned", function test(done) {
      assert(this.world.allPlans);
      done();
    });
})();
