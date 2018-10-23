var fs = require('fs');


var arr = [1,2,3,4,5,6,7,78];
arr.reverse();
arr.forEach(function (t) {
    console.log(t);
});



const buf = Buffer.from([42, 0x4D, 0x36, 0x00, 0x06,0x00, 0x00, 0x00]);


console.log(buf.readUInt32LE(2));


function CheckPngFile() {

}

// console.log(data);




function CheckBmpFile(filename,cb) {
    fs.readFile(filename, function(err,data) {
        if(err) {
            console.log(err);
            cb(err);
        }else{
            console.log(data.length);
            cb(null,data.readUInt32LE(2)==data.length);
        }
    });
}
console.log('===============');

CheckBmpFile('D:\\workspace\\vmsftpswitch\\ftp\\path1\\km1001_201809060027.bmp',function (err,result) {
    if(err){

    }
    else{
        console.log(result);
    }
});



