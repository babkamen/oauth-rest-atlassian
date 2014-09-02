"use strict";

var express = require('express');
var http = require('http');
var https = require('https');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = module.exports = express();
var OAuth = require('./lib/oauth').OAuth;
var fs = require('fs');

//get config
var config = require(process.cwd() + "/config.json");
var app_config = config.applications[config.default];

//setup consumer_secret if not already set to private key
if (app_config.oauth.consumer_secret === "") {
    app_config.oauth.consumer_secret = fs.readFileSync(process.cwd() + config.consumerPrivateKeyFile, "utf8");
    config.applications[config.default] = app_config;
    fs.writeFileSync(process.cwd() + '/config.json', JSON.stringify(config, null, 2));
}

var basePath = app_config.protocol + "://" + app_config.host + ":" + app_config.port;

//setup express
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.use(logger('combined'));
app.use(cookieParser());
app.use(session({
    secret: app_config.oauth.consumer_secret,
    resave: true,
    saveUninitialized: true
}));

//oauth consumer object
var consumer =
    new OAuth(
        basePath + app_config.paths['request-token'],
        basePath + app_config.paths['access-token'],
        app_config.oauth.consumer_key,
        app_config.oauth.consumer_secret,
        "1.0",
        "https://localhost/callback/",
        "RSA-SHA1");

//get new access token
app.get('/', function (request, response) {
    consumer.getOAuthRequestToken(
        function (error, oauthToken, oauthTokenSecret) {
            if (error) {
                console.log(error.data);
                response.send('Error getting OAuth access token');
            }
            else {
                request.session.oauthRequestToken = oauthToken;
                request.session.oauthRequestTokenSecret = oauthTokenSecret;
                response.redirect(basePath + app_config.paths.authorize + "?oauth_token=" + request.session.oauthRequestToken);
            }
        }
    );
});

//oauth dance callback
app.get('/callback', function (request, response) {
    consumer.getOAuthAccessToken(request.session.oauthRequestToken, request.session.oauthRequestTokenSecret, request.query.oauth_verifier,
        function (error, oauthAccessToken, oauthAccessTokenSecret) {
            if (error) {
                console.log(error.data);
                response.send("Error getting access token");
            }
            else {
                app_config.oauth.access_token = oauthAccessToken;
                app_config.oauth.access_token_secret = oauthAccessTokenSecret;
                //save to config file
                config.applications[config.default] = app_config;
                fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
                response.send("Successfully saved new OAuth access token");
            }
        }
    );
});

//access rest api
app.get('/rest', function (request, response) {
    consumer.get(basePath + "/rest/api/latest/" + request.query.req,
        app_config.oauth.access_token,
        app_config.oauth.access_token_secret,
        function (error, data) {
            data = JSON.parse(data);
            response.send(JSON.stringify(data, null, 2));
        }
    );
});

if(config.protocol === "https") {
    var privateKey  = fs.readFileSync(config.SSLPrivateKey, 'utf8');
    var certificate = fs.readFileSync(config.SSLCertificate, 'utf8');
    var credentials = {key: privateKey, cert: certificate};
    https.createServer(credentials, app).listen(config.port);
} else {
    http.createServer(app).listen(config.port);
}
