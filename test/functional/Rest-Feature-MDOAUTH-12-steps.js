/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');
var rest = require('../..').rest;

var config;
if(process.env.hasOwnProperty("bamboo_oauth_config_path")){
    config = require(process.env.bamboo_oauth_config_path);
} else {
    config = require("../../config.json");
}

/* Feature: Rest: Add Atlassian Bamboo support */
module.exports = (function() {
    return English.library()
    /*Scenario: Bamboo GET rest query */
        .define("Given I have an access token for my Bamboo server", function(done) {
            assert(config.applications.bamboo.oauth.access_token !== "");
            done();
        })
        .define("When I perform a build plan get", function(done) {
            var self = this;
            rest({
                    config: config.applications.bamboo,
                    query: "plan.json"
                },
                function(error, data){
                    assert(!error);
                    self.world.allPlans = data;
                    done();
                });
        })
        .define("Then build plans are returned", function(done) {
            assert(this.world.allPlans);
            done();
        });
})();