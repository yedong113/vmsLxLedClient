module.exports.getDeviceIdFromTopic = function (arr) {
    var index = arr.lastIndexOf('/');
    var id = arr.substr(index + 1, arr.length);
    return id;
}
module.exports.getInfoFromFilePath = function (path) {
    var isBMPFile = false;
    if (path.indexOf('.bmp') > -1) {
        isBMPFile = true;
    } else if (path.indexOf('.BMP') > -1) {
        isBMPFile = true;
    }
    if (!isBMPFile) {
        return null;
    }
    var telIndex = path.indexOf('\\');
    do {
        path = path.replace('\\', '/');
        telIndex = path.indexOf('\\');
    } while (telIndex > -1)
    var index = path.lastIndexOf('/');
    var fileDir = path.substr(0, index);
    var arry = path.split('/');
    var fileName = arry[arry.length - 1];
    var fileInfo = fileName.split('_');
    if (fileInfo.length != 2) {
        return null;
    }
    var deviceID = fileInfo[0];
    var fileTime = fileInfo[1];
    //生成时间
    if (fileTime.length != 16) {
        return null;
    }
    fileTime = fileTime.slice(0, 4) + '-' +
        fileTime.slice(4, 6) + '-' +
        fileTime.slice(6, 8) + ' ' +
        fileTime.slice(8, 10) + ':' +
        fileTime.slice(10, 12) + ':00';
    var data = {
        fileDir: fileDir,
        deviceID: deviceID,
        fileDate: fileTime
    }
    return data;
}
module.exports.newGuid = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
    }
    return guid;
}

function GetDateDiff(startTime, endTime, diffType) {//时间格式为 2018-9-27 18:29:24
    //将xxxx-xx-xx的时间格式，转换为 xxxx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "misecond":
            divNum = 1;
            break;
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseFloat((eTime.getTime() - sTime.getTime()) / parseInt(divNum)).toFixed(2);
}

module.exports.GetDateDiff = GetDateDiff;
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) {
        d = 0;
    }
    if (s.indexOf(".") == -1)
        s += "."; s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0; b = i != 1;
                    } else {
                        break;
                    }
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        }
        if (b) {
            s = s.substr(1);
        }
        return (pm + s).replace(/\.$/, "");
    }
    return this + "";
};


/**
 * 扩充String函数,增加一个翻转字符串的函数
 * @returns {string}
 * @constructor
 */
String.prototype.Reverse = function () {
    return this.split('').reverse().join('');
};

/**
 * 扩充String函数，增加统计一个子串出现的次数
 * @param substr
 * @returns {number}
 * @constructor
 */
String.prototype.CountSubString = function (substr) {
    var pos = this.indexOf(substr);
    var index = 0;
    while (pos > -1) {
        index = index + 1;
        pos = this.indexOf(substr, pos + 1);
    }
    return index;
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/**
 * 根据传入的时间选择此刻需要播放的节目列表
 * @param time 当前时间,格式为yyyy.mm.dd.HH24.MI.SS
 * @param progcfg 方案参数
 * @param cb 回调函数 返回此刻需要播放的节目列表
 * @constructor
 */
module.exports.SelectProgram = function (time, progcfg) {
        return new Promise((resolve, reject) => {
        try {
            var strAry = time.split('.');
            var programInfos = progcfg.programInfos;
            var timestramp = {
                year: (strAry[0]),
                month: (strAry[1]),
                day: (strAry[2]),
                hour: (strAry[3]),
                min: (strAry[4]),
                sec: parseInt(strAry[5])
            };
            var matchplans = [];
            var jsonResult = {};
            var matchPeriodId = -1;
            var matchFlag = 0;
            var matchStartDate = '';
            var matchEndDate = '';
            var currDate = timestramp.year + timestramp.month + timestramp.day;
            var currTime = timestramp.hour + '' + timestramp.min;
            var matchDate = [];
            //先匹配日期
            for (var iix = 0; iix < programInfos.length; iix++) {
                var matchCnt = 0;
                var programInfo = programInfos[iix];
                var matchDateIndex = -1;
                var dateInterval = 0;
                for (var iiy = 0; iiy < programInfo.dateList.length; iiy++) {
                    var startDate = programInfo.dateList[iiy].startDate.slice(0, 10).replaceAll('-', '');
                    var endDate = programInfo.dateList[iiy].endDate.slice(0, 10).replaceAll('-', '');
                    if (parseInt(currDate) >= parseInt(startDate) &&
                        parseInt(currDate) <= parseInt(endDate)) {//匹配到日期
                        matchDateIndex = iiy;
                        matchFlag++;
                        matchCnt++;
                        dateInterval = GetDateDiff(timestramp.year+'-'+timestramp.month+'-'+timestramp.day+' 00:00:00',
                            programInfo.dateList[iiy].endDate.slice(0, 10)+' 23:59:59',
                            'day');
                    }
                }
                if (matchCnt > 0) {
                    for (var iiy = 0; iiy < programInfo.timeList.length; iiy++) {
                        var startTime = programInfo.timeList[iiy].startTime.replaceAll(':', '');
                        var endTime = programInfo.timeList[iiy].endTime.replaceAll(':', '');

                        if (parseInt(currTime) >= parseInt(startTime) &&
                            parseInt(currTime) <= parseInt(endTime)) {
                            matchFlag++;
                            matchCnt++;
                            // console.log(' 匹配到时间 ',currTime,programInfo.timeList[iiy].startTime,programInfo.timeList[iiy].endTime);
                            matchplans.push({
                                programIndex: iix,
                                programId: programInfo.programId,
                                programType:programInfo.programType,
                                interval:programInfo.interval,
                                lastTime:programInfo.lastTime,
                                dateIndex: matchDateIndex,
                                date: programInfo.dateList[matchDateIndex],
                                time: programInfo.timeList[iiy],
                                dateInterval: dateInterval
                            });
                        }
                    }
                }
            }

            var minIndex = -1;
            var minDateInterval = 365;
            var matchplanintcuts=[];//插播节目
            var matchplannomals=[];//标准节目
            if (matchFlag >= 2) {
                for (var x = 0; x < matchplans.length; x++) {
                    //如果节目是插播的，优先级最高
                    var matchplan = matchplans[x];
                    if(matchplan.programType==1){//插播节目
                        matchplanintcuts.push(matchplan);
                    }else{
                        matchplannomals.push(matchplan);
                    }
                }
            }
            minIndex = -1;
            minDateInterval = 365;
            var playlist=[];
            if(matchplanintcuts.length>0){
                for(var iix=0;iix<matchplanintcuts.length;iix++){
                    var matchplan = matchplanintcuts[iix];
                    var matchindex=matchplan.programIndex;

                }
            }
            if(matchplanintcuts.length>0){
                for(var iix=0;iix<matchplanintcuts.length;iix++){
                    var matchplanintcut = matchplanintcuts[iix];
                    if (minDateInterval > matchplanintcut.dateInterval) {
                        minDateInterval = matchplanintcut.dateInterval;
                        var matchindex=matchplanintcut.programIndex;
                        var playFlag=0;
                        if(programInfos[matchindex].lastTime==undefined){
                            //还没有播放过此插播节目，播放它
                            console.log('还没有播放过此插播节目，播放它');
                            playlist=programInfos[matchindex].playList;
                            playFlag++;
                        }else{//上次播放过，判断间隔时间是否要重复播放
                            var currDateTime=timestramp.year+'-'+timestramp.month+'-'+timestramp.day+' '+timestramp.hour+':'+timestramp.min+':'+timestramp.sec;
                            console.log(programInfos[matchindex].lastTime,currDateTime);
                            var intcutinterval=GetDateDiff(programInfos[matchindex].lastTime,currDateTime,'minute');
                            console.log('距离上次插播时间为:',intcutinterval,programInfos[matchindex].interval);
                            if(intcutinterval<programInfos[matchindex].interval){
                                playlist=programInfos[matchindex].playList;
                                playFlag++;
                            }
                        }

                        if(playFlag>0){//插播节目匹配到,需要播放插播节目
                            jsonResult.programIndex=minIndex;
                            jsonResult.programId = programInfos[minIndex].programId;
                            jsonResult.name = programInfos[minIndex].name;
                            jsonResult.programType = programInfos[minIndex].programType;
                            jsonResult.date = programInfos[minIndex].dateList[0];
                            jsonResult.time = programInfos[minIndex].timeList;
                            jsonResult.playList = playlist;
                        }

                    }
                }
            }
            else if(matchplannomals.length>0){//匹配到普通节目

            }





            if(minIndex!=-1) {//没有匹配到插播节目，最小颗粒匹配普通节目
                for(var iix=0;iix<matchplannomals.length;iix++){
                    var matchplannormal = matchplannomals[iix];
                    //console.log(programInfos[matchplannormal.programIndex].playList);
                    playlist=playlist.concat(programInfos[matchplannormal.programIndex].playList);
                    if (minDateInterval > matchplannormal.dateInterval) {
                        minDateInterval = matchplannormal.dateInterval;
                        minIndex = matchplannormal.programIndex;
                    }
                }
            }

            console.log(playlist.length);


            if (minIndex != -1) {//匹配到具体的节目
                jsonResult.programIndex=minIndex;
                jsonResult.programId = programInfos[minIndex].programId;
                jsonResult.name = programInfos[minIndex].name;
                jsonResult.programType = programInfos[minIndex].programType;
                jsonResult.date = programInfos[minIndex].dateList[0];
                jsonResult.time = programInfos[minIndex].timeList;
                jsonResult.playList = playlist;
            } else {//没有匹配到播放节目，播放实时路况
                jsonResult.programId = 999;
                jsonResult.name = 'program999';
                jsonResult.programType = 1001;
                jsonResult.date = { dateId: 0,
                    startDate: timestramp.year+'-'+timestramp.month+'-'+timestramp.day+'T00:00:00',
                    endDate: timestramp.year+'-'+timestramp.month+'-'+timestramp.day+'T23:59:59' };
                jsonResult.time = { timeId: 0, startTime: '00:00', endTime: '23:59' };
                jsonResult.playList = [];
            }

            //console.log(jsonResult);
            resolve(jsonResult);

        }
        catch (ex) {
            reject(ex);
        }
    })
}