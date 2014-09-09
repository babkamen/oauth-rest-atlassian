# oauth-rest-atlassian
[![view on npm](http://img.shields.io/npm/v/oauth-rest-atlassian.svg?style=flat)](https://www.npmjs.org/package/oauth-rest-atlassian)
[![npm module downloads per month](http://img.shields.io/npm/dm/oauth-rest-atlassian.svg?style=flat)](https://www.npmjs.org/package/oauth-rest-atlassian)
[![Dependency status](https://david-dm.org/Cellarise/oauth-rest-atlassian.svg?style=flat)](https://david-dm.org/Cellarise/oauth-rest-atlassian)
[![Coverage](https://img.shields.io/badge/coverage-84%25_skipped:28%25-green.svg?style=flat)](https://www.npmjs.org/package/oauth-rest-atlassian)
[![Open issues](https://img.shields.io/github/issues/Cellarise/oauth-rest-atlassian.svg?style=flat)](https://github.com/Cellarise/oauth-rest-atlassian/issues)


> An OAuth wrapper to authenticate and use the Atlassian REST API. The initial authorisation dance is managed through a local web page.


##Installation

Install as a local package.

```cmd
npm install oauth-rest-atlassian
```


###Config.json

Setup config.json at the root of the package.

```js
{
    "default": "jira",
    "protocol": "http",
    "host": "localhost",
    "port": "8080",
    "SSLPrivateKey": "",
    "SSLCertificate": "",
    "consumerPrivateKeyFile": "rsa.pem",
    "applications": {
        "jira": {
            "protocol": "https",
            "host": "jira.cellarise.com",
            "port": "443",
            "oauth": {
                "consumer_key": "node-oauth-key1",
                "consumer_secret": "",
                "access_token": "",
                "access_token_secret": ""
            },
            "paths": {
                "request-token": "/plugins/servlet/oauth/request-token",
                "access-token": "/plugins/servlet/oauth/access-token",
                "authorize": "/plugins/servlet/oauth/authorize"
            }
        }
    }
}
```


###OAuth private and public keys

A private-public key pair is required to establish OAuth authorisation with an Atlassian product. The private key and public key can be generated using openssl:

```cmd
$ openssl genrsa -out rsa-key.pem 1024
$ openssl rsa -in rsa-key.pem -pubout -out rsa-key.pub
```


###Setup application link

An [application link](http://confluence.atlassian.com/display/JIRA/Configuring+Application+Links) profile must be established on the Atlassian product using a public key.  The Application Link requests the URL of the application to link. This URL is not used and a fill value should be used like `http://rest`.

In the create link screen (you can enter an application name of your choice):
* Application name: `Node OAuth`
* Application type: `Generic Application`
* Create incoming link: check

In the incoming link screen (you can enter an application name of your choice):
* Consumer Key: `node-oauth-key1`
* Consumer Name: `Node OAuth`
* Public Key: copy public key contents excluding the header `-----BEGIN PUBLIC KEY-----` and footer `-----END PUBLIC KEY-----`.


###SSL Private key and certificate

To run the local website using the https protocol you will need an SSL private key and certificate.  The private key can be generated using openssl:

```cmd
$ openssl genrsa -out rsa-key.pem 1024
```

To obtain a certificate a certificate signing request must be generated:

```cmd
$ openssl req -new -key rsa-key.pem -out certreq.csr
$ openssl x509 -req -in certreq.csr -signkey rsa-key.pem -out rsa-cert.pem
```

The certificate signing request should be sent to a certificate authority for to perform the certificate signing process.  However, for internal development purposes a self signed certificate can be generated:

```cmd
$ openssl x509 -req -in certreq.csr -signkey rsa-key.pem -out rsa-cert.pem
```


##Usage 

###Authorisation dance

Start the local website.

```cmd
npm start
```

Open the website (if hosted at `https://localhost` - [https://localhost](https://localhost))

If you have configured the https protocol and used a self signed certificate you will need to navigate security warnings.

If the Atlassian application configuration is valid and you have setup the application link correctly you should see the authorisation page.  Click the Allow button to retrieve and save the OAuth access tokens.  You can now use the REST API for the Atlassian product.


###Using the REST API

You can test the REST API using the local website and path `/rest?req=`


# API
{{>main}}
*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


#Changelog

<table style="width:100%;border-spacing:0px;border-collapse:collapse;margin:0px;padding:0px;border-width:0px;">
   <tr>
    <th style="width:20px;text-align:center;"></th>
    <th style="width:80px;text-align:center;">Type</th> 
    <th style="width:80px;text-align:left;">ID</th>
    <th style="text-align:left;">Summary</th>
   </tr>

  <tr>
    <td colspan=4><strong>Version: 0.3.0 - released 2014-09-09</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Feature</td> 
    <td style="width:80px;text-align:left;">MDOAUTH-11</td>
    <td>Rest: Add post, put and delete methods to rest function</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.2.2 - released 2014-09-06</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Non-functional</td> 
    <td style="width:80px;text-align:left;">MDOAUTH-10</td>
    <td>Readme: Fix error in changelog.</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.2.1 - released 2014-09-06</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Bug</td> 
    <td style="width:80px;text-align:left;">MDOAUTH-9</td>
    <td>Rest: Fix function hang when provided invalid options.</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.2.0 - released 2014-09-05</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Feature</td> 
    <td style="width:80px;text-align:left;">MDOAUTH-7</td>
    <td>Package: Add Atlassian rest query function</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.1 - released 2014-09-02</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Non-functional</td> 
    <td style="width:80px;text-align:left;">MDOAUTH-6</td>
    <td>Web server: Fix mistakes in the readme describing how to launch the server and the private key entry step.</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.0 - released 2014-09-02</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Feature</td> 
    <td style="width:80px;text-align:left;">MDOAUTH-4</td>
    <td>Package: Update oauth function to enable oauth request and authorisation with Atlassian REST API.</td>
   </tr>


</table>



# License

MIT License (MIT). All rights not explicitly granted in the license are reserved.

Copyright (c) 2014 John Barry

## Dependencies
[accepts@1.1.0](&quot;https://github.com/jshttp/accepts&quot;) - &quot;MIT&quot;, [base64-url@1.0.0](&quot;https://github.com/joaquimserafim/base64-url&quot;) - &quot;ISC&quot;, [basic-auth@1.0.0](&quot;https://github.com/visionmedia/node-basic-auth&quot;) - &quot;MIT&quot;, [buffer-crc32@0.2.3](&quot;https://github.com/brianloveswords/buffer-crc32&quot;) - &quot;MIT*&quot;, [bytes@1.0.0](&quot;https://github.com/visionmedia/bytes.js&quot;) - &quot;MIT*&quot;, [cookie-parser@1.3.3](&quot;https://github.com/expressjs/cookie-parser&quot;) - &quot;MIT&quot;, [cookie-signature@1.0.5](&quot;https://github.com/visionmedia/node-cookie-signature&quot;) - &quot;MIT&quot;, [cookie@0.1.2](&quot;https://github.com/shtylman/node-cookie&quot;) - &quot;MIT*&quot;, [debug@2.0.0](&quot;https://github.com/visionmedia/debug&quot;) - &quot;MIT*&quot;, [depd@0.4.4](&quot;https://github.com/dougwilson/nodejs-depd&quot;) - &quot;MIT&quot;, [destroy@1.0.3](&quot;https://github.com/stream-utils/destroy&quot;) - &quot;MIT&quot;, [ee-first@1.0.5](&quot;https://github.com/jonathanong/ee-first&quot;) - &quot;MIT&quot;, [errorhandler@1.2.0](&quot;https://github.com/expressjs/errorhandler&quot;) - &quot;MIT&quot;, [escape-html@1.0.1](&quot;https://github.com/component/escape-html&quot;) - &quot;MIT*&quot;, [etag@1.3.0](&quot;https://github.com/jshttp/etag&quot;) - &quot;MIT&quot;, [express-session@1.8.1](&quot;https://github.com/expressjs/session&quot;) - &quot;MIT&quot;, [express@4.9.0](&quot;https://github.com/strongloop/express&quot;) - &quot;MIT&quot;, [finalhandler@0.2.0](&quot;https://github.com/pillarjs/finalhandler&quot;) - &quot;MIT&quot;, [fresh@0.2.4](&quot;https://github.com/jshttp/fresh&quot;) - &quot;MIT&quot;, [ipaddr.js@0.1.2](&quot;https://github.com/whitequark/ipaddr.js&quot;) - &quot;MIT*&quot;, [media-typer@0.3.0](&quot;https://github.com/jshttp/media-typer&quot;) - &quot;MIT&quot;, [merge-descriptors@0.0.2](&quot;https://github.com/component/merge-descriptors&quot;) - &quot;MIT&quot;, [methods@1.1.0](&quot;https://github.com/visionmedia/node-methods&quot;) - &quot;MIT&quot;, [mime-db@1.0.1](&quot;https://github.com/jshttp/mime-db&quot;) - &quot;MIT&quot;, [mime-types@2.0.1](&quot;https://github.com/jshttp/mime-types&quot;) - &quot;MIT&quot;, [mime@1.2.11](&quot;https://github.com/broofa/node-mime&quot;) - &quot;MIT*&quot;, [morgan@1.3.0](&quot;https://github.com/expressjs/morgan&quot;) - &quot;MIT&quot;, [ms@0.6.2](&quot;https://github.com/guille/ms.js&quot;) - &quot;MIT*&quot;, [mz@1.0.1](&quot;https://github.com/normalize/mz&quot;) - &quot;MIT&quot;, [native-or-bluebird@1.1.1](&quot;https://github.com/normalize/native-or-bluebird&quot;) - &quot;MIT&quot;, [negotiator@0.4.7](&quot;https://github.com/federomero/negotiator&quot;) - &quot;MIT&quot;, [oauth-rest-atlassian@0.0.0](&quot;https://github.com/Cellarise/OAuth-REST-Atlassian&quot;) - &quot;MIT License (MIT)&quot;, [on-finished@2.1.0](&quot;https://github.com/jshttp/on-finished&quot;) - &quot;MIT&quot;, [on-headers@1.0.0](&quot;https://github.com/jshttp/on-headers&quot;) - &quot;MIT&quot;, [parseurl@1.3.0](&quot;https://github.com/expressjs/parseurl&quot;) - &quot;MIT&quot;, [path-to-regexp@0.1.3](&quot;https://github.com/component/path-to-regexp&quot;) - &quot;MIT*&quot;, [proxy-addr@1.0.1](&quot;https://github.com/expressjs/proxy-addr&quot;) - &quot;MIT&quot;, [qs@2.2.3](&quot;https://github.com/hapijs/qs&quot;) - [&quot;BSD&quot;], [range-parser@1.0.2](&quot;https://github.com/jshttp/range-parser&quot;) - &quot;MIT&quot;, [send@0.9.1](&quot;https://github.com/visionmedia/send&quot;) - &quot;MIT&quot;, [serve-static@1.6.1](&quot;https://github.com/expressjs/serve-static&quot;) - &quot;MIT&quot;, [type-is@1.5.1](&quot;https://github.com/jshttp/type-is&quot;) - &quot;MIT&quot;, [uid-safe@1.0.1](&quot;https://github.com/crypto-utils/uid-safe&quot;) - &quot;MIT&quot;, [utils-merge@1.0.0](&quot;https://github.com/jaredhanson/utils-merge&quot;) - [&quot;MIT&quot;], [vary@1.0.0](&quot;https://github.com/jshttp/vary&quot;) - &quot;MIT&quot;, 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.