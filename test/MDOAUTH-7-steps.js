/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');
var rest = require('..').rest;

/* Feature: Package: Add Atlassian rest query function */
module.exports = (function() {
    return English.library()
    /*Scenario: JIRA rest query */
        .define("When I perform a jql search", function(done) {
            var self = this;
            var jiraQuery = "search?jql=(issue=MDOAUTH-7)";
            var config;
            if(process.env.hasOwnProperty("oauth_config_path")){
                config = require(process.env.oauth_config_path);
            } else {
                config = require("../config.json");
            }
            rest({
                config: config.applications.jira,
                query: jiraQuery
            },
            function(error, data){
                assert(!error);
                self.world.searchData = data;
                done();
            });
        })
        .define("Then expected search results are returned", function(done) {
            assert.equal(this.world.searchData.issues[0].key, "MDOAUTH-7");
            done();
        });
})();