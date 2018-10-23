
**简要描述：** 

- VMS信息发布驱动层接口 nodejs接口

#### **参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|serialNumber |是  |string |流水号   |
|programId |是  |Int |节目编号   |
|strIP |是  |string | 设备地址    |
|screenW |是  |Int | 屏幕宽度    |
|screenH |是  |Int | 屏幕高度    |
|playList     |是 |Array | 播放列表    |



##### playList 数组中单个元素的结构

|字段|类型|说明|
|:----    |:----- |-----   |
|fileId|Int|文件编号|
| mediaType | Int| 无媒体类型 1：图片 2：视频 3：文本|
| content | string| 媒体内容 |
| url | string| 文件地址 |
| x | Int| x坐标 |
| y | Int| y坐标 |
| width | Int| 宽度 |
| height | Int| 高度 |
| delay | Int| 停留时间 |
| inStyle | Int| 入屏方式 |
| outStyle | Int| 出屏方式 |
| speed | Int| 入出屏速度 |


#### 调用方式

将KmlcLedServer文件夹拷贝到工程node_modules下


```
var kmlc_ledserver = require('KmlcLedServer');
var options={};

var ledserver = new kmlc_ledserver();

ledserver.SendProgram(options,function (err) {
    console.log(err);
});
```

