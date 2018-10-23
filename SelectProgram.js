/**
 * 扩充String函数,增加一个翻转字符串的函数
 * @returns {string}
 * @constructor
 */
String.prototype.Reverse = function() {
    return this.split('').reverse().join('');
};

/**
 * 扩充String函数，增加统计一个子串出现的次数
 * @param substr
 * @returns {number}
 * @constructor
 */
String.prototype.CountSubString = function(substr) {
    var pos = this.indexOf(substr);
    var index=0;
    while(pos>-1){
        index = index+1;
        pos = this.indexOf(substr,pos+1);
    }
    return index;
};

String.prototype.replaceAll = function(search, replacement) {
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
function SelectProgram(time,progcfg,cb) {
    try{
        var strAry = time.split('.');

        var programInfos = progcfg.programInfos;

        var timestramp = {
            year:(strAry[0]),
            month:(strAry[1]),
            day:(strAry[2]),
            hour:(strAry[3]),
            min:(strAry[4]),
            sec:parseInt(strAry[5])
        };

        var matchplan = [];
        var jsonResult={};
        //在periodTimeInfos中匹配日期
        var matchPeriodId=-1;
        var matchFlag=0;
        var matchStartDate='';
        var matchEndDate='';
        var currDate = timestramp.year+timestramp.month+timestramp.day;
        var currTime = timestramp.hour+''+timestramp.min;

        var matchDate=[];

        //先匹配日期
        for(var iix=0;iix<programInfos.length;iix++){
            var matchCnt=0;
            var programInfo=programInfos[iix];
            var matchDateIndex=-1;
            var dateInterval=0;
            for(var iiy=0;iiy<programInfo.dateList.length;iiy++){
                var startDate=programInfo.dateList[iiy].startDate.slice(0,10).replaceAll('-','');
                var endDate=programInfo.dateList[iiy].endDate.slice(0,10).replaceAll('-','');
                console.log(startDate,endDate);
                if(parseInt(currDate)>=parseInt(startDate)&&
                    parseInt(currDate)<=parseInt(endDate)){//匹配到日期
                    matchDateIndex=iiy;
                    matchFlag++;
                    matchCnt++;
                    dateInterval=parseInt(programInfo.dateList[iiy].endDate)-parseInt(programInfo.dateList[iiy].startDate);
                }
            }
            if(matchCnt>0){
                for(var iiy=0;iiy<programInfo.timeList.length;iiy++){
                    var startTime=programInfo.timeList[iiy].startTime.replaceAll(':','');
                    var endTime=programInfo.timeList[iiy].endTime.replaceAll(':','');

                    if(parseInt(currTime)>=parseInt(startTime)&&
                        parseInt(currTime)<=parseInt(endTime)){
                        matchFlag++;
                        matchCnt++;
                        console.log(' 匹配到时间 ',currTime,programInfo.timeList[iiy].startTime,programInfo.timeList[iiy].endTime);
                        matchplan.push({
                            programIndex:iix,
                            programId:programInfo.programId,
                            dateIndex:matchDateIndex,
                            date:programInfo.dateList[matchDateIndex],
                            time:programInfo.timeList[iiy],
                            dateInterval:dateInterval
                        });
                    }
                }
            }
        }
        console.log(matchFlag);
        var minIndex=-1;
        var minDateInterval=365;
        if(matchFlag>=2){
            //console.log(programInfos);
            for (var iix=0;iix<matchplan.length;iix++){
                if(minDateInterval>matchplan[iix].dateInterval){
                    minDateInterval=matchplan[iix].dateInterval;
                    minIndex=iix;
                }
            }
        }
        console.log('minIndex=',minIndex);
        if(minIndex!=-1){
            console.log(matchplan[minIndex]);
            jsonResult.programId=matchplan[minIndex].programId;
            jsonResult.name=programInfos[minIndex].name;
            jsonResult.programType=programInfos[minIndex].programType;
            jsonResult.date=matchplan[minIndex].date;
            jsonResult.time=matchplan[minIndex].time;
            jsonResult.playList=programInfos[minIndex].playList;
        }else{//没有匹配到播放节目，播放实时路况
            jsonResult.programId=999;
            jsonResult.name='program999';
            jsonResult.programType=1001;
            jsonResult.date={dateId:0,startDate:currDate,endDate:currDate};
            jsonResult.time={timeId:0,startTime:'0000',endTime:'2359'};
            jsonResult.playList=[];
        }
        cb(null,jsonResult);

    }
    catch(ex){
        cb(ex,null);
    }

}
module.exports = SelectProgram;