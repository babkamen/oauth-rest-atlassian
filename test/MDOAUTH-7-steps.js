/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');
var rest = require('..').rest;

/* Feature: Package: Add Atlassian rest query function */
module.exports = (function() {
    return English.library()
    /*Scenario: JIRA rest query */
        .define("$type I perform a jql search on issue $key and save the result", function(type, key, done) {
            var self = this;
            var jiraQuery = "search?jql=(issue=" + key + ")";
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
                self.world.searchKey = key;
                done();
            });
        })
        .define("Then expected search results are returned", function(done) {
            assert.equal(this.world.searchData.issues[0].key, this.world.searchKey);
            done();
        });
})();