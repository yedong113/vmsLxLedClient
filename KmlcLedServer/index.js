var path = require('path');
var process = require('process')
process.env.PATH = path.join(__dirname,'','/lib')+';'+process.env.PATH

var LxLed = require('./LX.node').LxLed;
var lxled = new LxLed();


function KmlcLedServer() {

}

KmlcLedServer.prototype.CheckBmpFile = function (filename) {

}

KmlcLedServer.prototype.SendProgram = function(programscfg,cb){
    var programs = JSON.parse(programscfg);

    var normolPrograms=[];
    var screenSavers=[];
    programs.playList.forEach(function (t) {
        if(t.screenSaver==1){
            screenSavers.push(t);
        }
        else{
            normolPrograms.push(t);
        }
    });

    normolPrograms.reverse();
    screenSavers.reverse();
    var programId=1;
    var fileId=1;

    var result='';

    normolPrograms.forEach(function (t) {
        var options={
            StrIP:programs.strIP,
            ScreenW:programs.screenW,
            ScreenH:programs.screenH,
            Textpath:t.url,
            Program_id: programId,//节目序号
            Programname: "left",//节目名字
            Playtime: 10, //播放时间
            Waitfinish: 1,//是否等待播放节目完成（当为1是， Playtime无效，否则以上面的时间为 准）
            Area_id: 1,//区域序号
            X: 0,//区域左上角x坐标
            Y: 0, //区域左上角坐标
            W: t.width,//区域宽
            H: t.height, //区域高
            Areaname: 'left',//区域名字
            File_id: fileId,//文件序号
            Moveintype: t.inStyle,//进入特效方式
            Moveinspeed: t.speed,//进入特效速度
            Remain: t.delay,//停留时间
            Moveouttype: t.outStyle,//退出特效方式
            Moveoutspeed: 1,//退出特效速度
        } ;
        programId = programId+1;
        fileId = fileId+1;
        lxled.SendPic(options);
        lxled.SetCut({
            StrIP:programs.strIP,
            Program_id:options.Program_id
        });
    });


    screenSavers.forEach(function (t) {
        var options={
            StrIP:programs.strIP,
            ScreenW:programs.screenW,
            ScreenH:programs.screenH,
            Textpath:t.url,
            Program_id: programId,//节目序号
            Programname: "left",//节目名字
            Playtime: 10, //播放时间
            Waitfinish: 1,//是否等待播放节目完成（当为1是， Playtime无效，否则以上面的时间为 准）
            Area_id: 1,//区域序号
            X: 0,//区域左上角x坐标
            Y: 0, //区域左上角坐标
            W: t.width,//区域宽
            H: t.height, //区域高
            Areaname: 'left',//区域名字
            File_id: fileId,//文件序号
            Moveintype: t.inStyle,//进入特效方式
            Moveinspeed: t.speed,//进入特效速度
            Remain: t.delay,//停留时间
            Moveouttype: t.outStyle,//退出特效方式
            Moveoutspeed: 1,//退出特效速度
        } ;
        programId = programId+1;
        fileId = fileId+1;
        lxled.SendPic(options);
    });


    result = lxled.Send({
        StrIP:programs.strIP,
        Direction: 'left'
    });
    cb(result);
}

module.exports = KmlcLedServer;