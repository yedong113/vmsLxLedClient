var SelectProgram = require('./common').SelectProgram;

var fs = require('fs');


var sendprogram = {
    deviceId:'km1104',
    programInfos:[]
};




var progid=0;


var fileid=0;

var i=1;

if(i==1){
    var program={
        programId:progid,
        name:'program'+progid,
        programType:1002,
        playList:[],
        dateList:[],
        timeList:[]
    };
    var nameindex=0;
    for(var iix=0;iix<=3;iix++){
        var playInfo = {
            fileId:fileid,
            mediaType:2,
            content:'',
            url:'program\\bfb34b5ba622d550405b2dda3ea2e93d_'+nameindex+'.png',
            x:0,
            y:0,
            width:128,
            height:128,
            delay:30,
            inStyle:0,
            outStyle:0,
            speed:5,
            createTime:'2018-05-25T09:42:11.000Z',
            createUser:'db9b81ede4e23b7972b3dce24d3b4072',
            state:1,
            desc:''
        };
        fileid=fileid+1;
        nameindex=nameindex+1;
        program.playList.push(playInfo);
    }


    {
        program.dateList.push({
            dateId:0,
            startDate:'20181001',
            endDate:'20181007'
        });
    }

    program.timeList.push({
        dateId:0,
        startTime:'0000',
        endTime:'0730'
    });

    program.timeList.push({
        dateId:1,
        startTime:'0900',
        endTime:'1630'
    });


    program.timeList.push({
        dateId:2,
        startTime:'1700',
        endTime:'2359'
    });


    sendprogram.programInfos.push(program);

}
progid = progid+1;


if(i==1){
    var program={
        programId:progid,
        name:'program'+progid,
        programType:1002,
        playList:[],
        dateList:[],
        timeList:[]
    };
    var nameindex=0;
    for(var iix=0;iix<=2;iix++){
        var playInfo = {
            fileId:fileid,
            mediaType:2,
            content:'',
            url:'program\\bfb34b5ba622d550405b2dda3ea2e93d_'+nameindex+'.png',
            x:0,
            y:0,
            width:128,
            height:128,
            delay:30,
            inStyle:0,
            outStyle:0,
            speed:5,
            createTime:'2018-05-25T09:42:11.000Z',
            createUser:'db9b81ede4e23b7972b3dce24d3b4072',
            state:1,
            desc:''
        };
        fileid=fileid+1;
        nameindex=nameindex+1;
        program.playList.push(playInfo);
    }


    {
        program.dateList.push({
            dateId:0,
            startDate:'20181001',
            endDate:'20181002'
        });
    }

    program.timeList.push({
        dateId:0,
        startTime:'0000',
        endTime:'0700'
    });

    program.timeList.push({
        dateId:1,
        startTime:'0900',
        endTime:'1630'
    });


    program.timeList.push({
        dateId:2,
        startTime:'1700',
        endTime:'2359'
    });


    sendprogram.programInfos.push(program);

}

/*

console.log(sendprogram);

console.log(JSON.stringify(sendprogram));

fs.writeFile('d:\\message.json', JSON.stringify(sendprogram),function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
});




*/


var time='2018.10.06.16.01.10';

var data = fs.readFileSync('d:\\km1003_plan.json');
var progcfg = JSON.parse(data);

/*console.log(progcfg);

var lastTime = new Date(progcfg.startDate);
console.log(lastTime);*/

/*
SelectProgram(time,progcfg.data,function (err,jsonResult) {
    if(err==null){
        fs.writeFile('d:\\result.json', JSON.stringify(jsonResult),function(err){
            if(err) console.log('写文件操作失败');
            else console.log('写文件操作成功');
        });

        console.log(JSON.stringify(jsonResult));

    }else{
        console.log(err);
    }
    console.log('=============================');
});
*/

var jsonResult = SelectProgram(time,progcfg.data).then(function (response) {
    console.log(response);
    fs.writeFile('d:\\result.json', JSON.stringify(response),function(err){
        if(err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    });
});
