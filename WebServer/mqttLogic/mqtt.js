var mqtt = require('mqtt');

module.exports = () => {
  var options = {
    port: 16331,
    host: 'mqtt://soldier.cloudmqtt.com',
    username: 'user1',
    password: '0000',
  };

  let client = mqtt.connect('mqtt://soldier.cloudmqtt.com', options);

  client.on('connect', function() {
    console.log('connected to MQTT');
    client.subscribe('/user1/rfid');
    client.subscribe('/user1/weight');
    client.subscribe('/user1/ultrasonic/1');
    client.subscribe('/user1/ultrasonic/2');
  }); 

  client.on('message', function(topic, message, packet) {
    console.log("Received '" + message + "' on '" + topic + "'");
  });  
};
