/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');
var OAuth = require('../lib/oauth').OAuth;

/* Feature: OAuth authorisation dance */
module.exports = (function() {
    return English.library()
    /*Scenario: JIRA authorisation */
        .define("Given I have an access token", function(done) {
            var config = require("../config.json");
            var app_config = config.applications[config.default];
            var basePath = app_config.protocol + "://" + app_config.host + ":" + app_config.port;
            this.world.app_config = app_config;
            this.world.basePath = basePath;
            //oauth consumer object
            this.world.consumer =
                new OAuth(
                        basePath + app_config.paths['request-token'],
                        basePath + app_config.paths['access-token'],
                    app_config.oauth.consumer_key,
                    app_config.oauth.consumer_secret,
                    "1.0",
                    "https://localhost/callback/",
                    "RSA-SHA1");
            done();
        })
        .define("When I perform the get issue operation on $issue", function(issue, done) {
            var self = this;
            this.world.consumer.get(this.world.basePath + "/rest/api/latest/issue/" + issue,
                this.world.app_config.oauth.access_token,
                this.world.app_config.oauth.access_token_secret,
                function (error, data) {
                    self.world.data = JSON.parse(data);
                    done();
                }
            );
        })
        .define("Then issue $issue is returned", function(issue, done) {
            assert.equal(this.world.data.key, issue);
            done();
        });
})();