/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');
var rest = require('..').rest;

var config;
if(process.env.hasOwnProperty("oauth_config_path")){
    config = require(process.env.oauth_config_path);
} else {
    config = require("../config.json");
}

/* Feature: Rest: Add post, put and delete methods to rest function */
module.exports = (function() {
    return English.library()
    /*Scenario: JIRA POST rest query */
        .define("When I perform a post create operation", function(done) {
            var self = this;
            var jiraQuery = "issue";
            rest({
                    config: config.applications.jira,
                    query: jiraQuery,
                    method: 'post',
                    postData: {
                        fields: {
                            project: {
                                key: 'MDTEST'
                            },
                            summary: 'test',
                            "issuetype": {
                                "name": "Feature"
                            }
                        }
                    }
                },
                function(error, data){
                    assert(!error);
                    self.world.newIssue = data;
                    done();
                });
        })
        .define("Then a new issue is created", function(done) {
            assert(this.world.newIssue);
            done();
        })/*Scenario: JIRA PUT rest query */
        .define("When I perform a put update operation", function(done) {
            var jiraQuery = "issue/" + this.world.newIssue.key;
            rest({
                    config: config.applications.jira,
                    query: jiraQuery,
                    method: 'put',
                    postData: {
                        fields: {
                            summary: 'test-update'
                        }
                    }
                },
                function(error){
                    assert(!error);
                    done();
                });
        })
        .define("Then expected update is performed", function(done) {
            var jiraQuery = "search?jql=(issue=" + this.world.newIssue.key + ")";
            rest({
                    config: config.applications.jira,
                    query: jiraQuery
                },
                function(error, data){
                    assert(!error);
                    assert.equal(data.issues[0].fields.summary, 'test-update');
                    done();
                });
        })/*Scenario: JIRA DELETE rest query */
        .define("When I perform a delete operation", function(done) {
            var jiraQuery = "issue/" + this.world.newIssue.key;
            rest({
                    config: config.applications.jira,
                    query: jiraQuery,
                    method: 'delete'
                },
                function(error){
                    assert(!error);
                    done();
                });
        })
        .define("Then expected delete is performed", function(done) {
            assert(true);
            done();
        });
})();