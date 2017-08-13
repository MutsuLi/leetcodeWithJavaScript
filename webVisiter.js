var http = require("http");
var querystring = require('querystring');
var fs = require("fs");
var option = {
    hostname: "www.baidu.com",
    /*headers:{
           "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/5.0.4.3000 Chrome/47.0.2526.73 Safari/537.36"
   }
   */
}
var req = http.request(option, function (res) {
    var temp = [];
    res.setEncoding("utf-8")
    var status = res.statusCode;
    var header = JSON.stringify(res.headers);
    console.log("状态码:" + status);
    console.log("HTTP Header:" + "\n" + header);
    res.on("data", function (chunk) {
        temp += chunk;
    })
    res.on("end", function () {
        console.log("网页内容" + "\n" + temp)
        fs.writeFile('read.txt', temp, function (err) {
            if (err) {
                return console.error(err);
            }
        });
        console.log("GET请求已完成")
    })
})
req.end();