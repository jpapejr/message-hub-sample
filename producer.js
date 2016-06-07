'use strict';

var appEnv      = require('cfenv').getAppEnv();
var mqlight     = require('mqlight');

if (appEnv.isLocal){
  console.log('Running locally..');
  var services = require('./vcap_services.json');
} else {
  console.log('Running in CF..');
}

var sendClient = mqlight.createClient({service: ['amqps://mqlightprod-ag-00020a.services.dal.bluemix.net:2912','amqps://mqlightprod-ag-00020b.services.dal.bluemix.net:2912'],
  user: 'MnFDpFPdNVSV', password: ']v/pXq\'b2)Ay'});

var topic = 'public';
sendClient.on('started', function() {
  sendClient.send(topic, 'Hello World!', function (err, data) {
    console.log('Sent: %s', data);
    sendClient.stop();
  });
});
