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


/**
 * 根据传入的时间选择此刻需要播放的节目列表
 * @param time 当前时间,格式为yyyy.mm.dd.HH24.MI.SS
 * @param progcfg 方案参数
 * @param cb 回调函数 返回此刻需要播放的节目列表
 * @constructor
 */
function SelectProgram(time,progcfg,cb) {
    var strAry = time.split('.');

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

    cb(jsonResult);
}
module.exports = SelectProgram;