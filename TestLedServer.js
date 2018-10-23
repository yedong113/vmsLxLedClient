
var redius = require('redis')

var client = redius.createClient(6379,'192.168.128.130');
client.hgetall('car',function (error,car) {
   console.log(car);
});
