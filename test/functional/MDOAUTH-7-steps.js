"use strict";
/* Feature: Package: Add Atlassian rest query function */
module.exports = (function testSuite() {
  var English = require("yadda").localisation.English;
  var assert = require("assert");
  var rest = require("../..").rest;
  var config = require("../..").config;
  return English.library()
    /*Scenario: JIRA rest query */
    .define("$type I perform a jql search on issue $key and save the result", function test(type, key, done) {
      var self = this;
      var jiraQuery = "search?jql=(issue=" + key + ")";
      rest({
          "config": config("jira"),
          "query": jiraQuery
        },
        function restCallback(error, data) {
          assert(!error);
          self.world.searchData = data;
          self.world.searchKey = key;
          done();
        });
    })
    .define("Then expected search results are returned", function test(done) {
      assert.equal(this.world.searchData.issues[0].key, this.world.searchKey);
      done();
    });
})();
