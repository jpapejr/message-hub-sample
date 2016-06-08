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
    var recvClient = mqlight.createClient(payload);

    var topicPattern = 'testTopic';
    recvClient.on('started', function() {
      recvClient.subscribe(topicPattern, 'share1');
      recvClient.on('message', function(data) {
        console.log('Recv: %s', data);
      });
    });
  }
});
