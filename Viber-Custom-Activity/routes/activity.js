'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path, 
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {

    console.log("5 -- For Edit");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Edited: "+req.body.inArguments[0]);    
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    
    console.log("5 -- For Save");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
    console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("5 -- For Execute");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Executed: "+req.body.inArguments[0]);
    
    var requestBody = req.body.inArguments[0];

    const ChannelId = requestBody.ChannelId;
     console.log("ChannelId=>>>>>>>> " + ChannelId);
    const authToken = requestBody.authToken;
     console.log("authToken=>>>>>>>>> " + authToken);
    const to = requestBody.to;
     console.log("to=>>>>>>>>> " + to);
    /*const from = requestBody.messagingService;
     console.log("from=>>>>>>>>>>> " + from);*/
    const body = requestBody.body;
     console.log("body=>>>>>>>>>>>>>> " + body);

   /* const client = require('twilio')(accountSid, authToken); 
     console.log("client=>>>>>>>>>>>>>> " + client);
    client.messages 
          .create({ 
             body: body,
             from: '+18566197940',
             to: to
           }) 
          .then(message => console.log(message.sid)) 
          .done();*/

          var request = require('request');
          var options = {
            'method': 'POST',
            'url': 'https://api.amio.io/v1/messages',
            'headers': {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            body: '{\r\n  "channel": {\r\n    "id": "+ChannelId+"\r\n  },\r\n  "contact": {\r\n    "id": "6873520748825954928"\r\n  },\r\n  "content": {\r\n        "type": "text",\r\n        "payload": "From SFMC!"\r\n      }\r\n  }\r\n}'
          
          };

          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });




    // FOR TESTING
    logData(req);
    res.send(200, 'Execute');

    // Used to decode JWT
    // JWT(req.body, process.env.jwtSecret, (err, decoded) => {

    //      // verification error -> unauthorized request
    //      if (err) {
    //          console.error(err);
    //          return res.status(401).end();
    //       }

    //      if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
    //          // decoded in arguments
    //          var decodedArgs = decoded.inArguments[0];
            
    //         logData(req);
    //         res.send(200, 'Execute');
    //      } else {
    //          console.error('inArguments invalid.');
    //          return res.status(400).end();
    //      }
    //  });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {

    console.log("5 -- For Publish");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Published: "+req.body.inArguments[0]);        
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
     logData(req);
     res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {

    console.log("5 -- For Validate");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Validated: "+req.body.inArguments[0]);       
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};

