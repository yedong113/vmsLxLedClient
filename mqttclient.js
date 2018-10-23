var mqtt = require('mqtt');

var opt={
    port:1883,
    clientId:'nodejs'
};

var mqqt_client = mqtt.connect('mqtt://192.168.12.72');

mqqt_client.on('connect',function () {
    console.log('已连接到MQTT服务器');
    mqqt_client.subscribe('download/vms/settings/km1104');
    mqqt_client.subscribe('download/vms/controls/km1104');

});

mqqt_client.on('message',function (topic,msg) {
    console.log(msg.toString('utf8'));
});