var http=require("http");
var querystring = require('querystring');
var option={
    hostname:"api.seniverse.com",
    //method:"GET",
    path:"/v3/weather/now.json?key=fr63tm1d2fah19ng&location=shanghai&language=zh-Hans&unit=c",
}
//var url="http://www.weather.com.cn/data/sk/101010100.html";
var req=http.request(option,function(res){
    var temp=[];
    res.setEncoding("utf-8")
    var status=res.statusCode;
    var header=JSON.stringify(res.headers);
    console.log("请求状态:"+status);
    console.log("HTTP头:"+"\n"+header);
    res.on("data",function(chunk){
        temp+=chunk;
    })
    res.on("end",function(){
        console.log("天气JSON"+"\n"+temp)
        console.log("GET请求已完成")
    })

})
req.end();