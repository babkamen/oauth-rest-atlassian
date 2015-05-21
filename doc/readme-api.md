## API
<a name="module_rest"></a>
### rest
Execute a rest query using the http GET, POST, PUT or DELETE method


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>Object</code> |  | required options |
| [opts.config] | <code>Object</code> |  | the configuration object which must contain the following properties: config.protocol - the protocol of the JIRA server (http/https) config.host - the host address of the JIRA server config.port - the port of the JIRA server config.paths["request-token"] - the oauth request-token config.paths["access-token"] - the oauth access-token config.oauth.consumer_key - the oauth consumer key config.oauth.consumer_secret - the oauth consumer secret |
| [opts.query] | <code>Object</code> |  | the rest query url |
| [opts.method] | <code>Object</code> | <code>&quot;get&quot;</code> | optional the http method - one of get, post, put, delete |
| [opts.postData] | <code>Object</code> | <code>&quot;&quot;</code> | optional the post data for create or update queries. |
| cb | <code>function</code> |  | the callback function called once the search has completed. The callback function must have the following signature: done(error, data). - error - an error object returned by oauth - data - the data returned as a JSON object |


-

*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.