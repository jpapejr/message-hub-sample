'use strict';

var mqlight     = require('mqlight');
var service     = require('./servicekey.json');
var request     = require('request');
var uuid        = require('uuid');

request(service.credentials.connectionLookupURI, function(err, resp, body){
  if (!err && resp.statusCode === 200){
    var payload = JSON.parse(body);
    payload.user = service.credentials.username;
    payload.password = service.credentials.password;
    payload.id = ('test_' + uuid.v4()).replace(/-/g, '_');
    var sendClient = mqlight.createClient(payload);

    var topic = 'testTopic';
    sendClient.on('started', function() {
      sendClient.send(topic, 'Hello World!', function (err, data) {
        console.log('Sent: %s', data);
        sendClient.stop();
      });
    });
  }
});
