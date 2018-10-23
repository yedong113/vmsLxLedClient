var fs = require('fs');

var _instance=null;

module.exports = function(deviceId){ //定义单例类
    function GlobalData(time){
        this.programScheme='';
        this.currProgramScheme='';
        this.name = "danhuang";
        this.book = 'Node.js';
        this.deviceId = time;
        this.readProgramScheme();
        this.readCurrProgramScheme();
        this.programfile=''
    }
    GlobalData.prototype = {
        constructor : GlobalData,
        show : function(){
            console.log(this.book + ' is write by ' + this.name + ', time is ' + this.time);
        }
    }

    GlobalData.prototype.readProgramScheme = function () {
        var data = fs.readFileSync('data/'+deviceId+'/programScheme.json');
        this.programScheme = JSON.parse(data);
    }

    GlobalData.prototype.readCurrProgramScheme = function () {
        var data = fs.readFileSync('data/'+deviceId+'/currProgramScheme.json');
        this.currProgramScheme = JSON.parse(data);
    }




    GlobalData.prototype.setProgramScheme = function (data) {
        this.readProgramScheme();
        this.programScheme = data;
    }

    GlobalData.prototype.setCurrProgramScheme = function (data) {
        this.currProgramScheme = data;
    }


    GlobalData.prototype.getProgramScheme = function () {
        return this.programScheme;
    }

    GlobalData.prototype.getCurrProgramScheme = function () {
        return this.currProgramScheme;
    }

    GlobalData.prototype.writeProgramScheme = function (data) {
        fs.writeFile('data/'+deviceId+'/programScheme.json', JSON.stringify(data),function(err){
            if(err) console.log('写文件操作失败:data\/'+deviceId+'/programScheme.json');
            else console.log('写文件操作成功:data\/'+deviceId+'\/programScheme.json');
        });
    }

    GlobalData.prototype.writeCurrProgramScheme = function (data) {
        fs.writeFile('data/'+deviceId+'/currProgramScheme.json', JSON.stringify(data),function(err){
            if(err) console.log('写文件操作失败:data\\currProgramScheme.json');
            else console.log('写文件操作成功:data\\currProgramScheme.json');
        });
    }

    this.getInstance = function(){
        if (_instance === null){
            _instance = new GlobalData(deviceId);
        }
        return _instance;
    }
}





Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

module.exports.Date = Date;

