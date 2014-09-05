"use strict";
var OAuth = require('oauth-rest-atlassian').OAuth;

/**
 * Execute a rest query using the http get method
 * @module rest
 * @param opts {Object} - required options
 * @param {Object} [opts.config] - the configuration object which must contain the following properties:
 * config.protocol - the protocol of the JIRA server (http/https)
 * config.host - the host address of the JIRA server
 * config.port - the port of the JIRA server
 * config.paths['request-token'] - the oauth request-token
 * config.paths['access-token'] - the oauth access-token
 * config.oauth.consumer_key - the oauth consumer key
 * config.oauth.consumer_secret - the oauth consumer secret
 * @param {Object} [opts.query] - the rest query
 * @param cb {Function} - the callback function called once the search has completed.
 * The callback function must have the following signature: done(error, data).
 * - error - an error object returned by oauth
 * - data - the data returned as a JSON object
 */
module.exports = function (opts, cb) {
    //check options
    var config = opts.config;
    var query = opts.query;

    //ensure required properties are available in config.json and search jql provided
    if (config.protocol && config.host && config.port && query) {
        var basePath = config.protocol + "://" + config.host + ":" + config.port;

        //oauth consumer object
        var consumer =
            new OAuth(
                basePath + config.paths['request-token'],
                basePath + config.paths['access-token'],
                config.oauth.consumer_key,
                config.oauth.consumer_secret,
                "1.0",
                null,
                "RSA-SHA1");

        //get
        consumer.get(basePath + "/rest/api/latest/" + query,
            config.oauth.access_token,
            config.oauth.access_token_secret,
            function(error, data){
                cb(error, JSON.parse(data));
            }
        );
    }
};
