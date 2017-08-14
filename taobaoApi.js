var crypto = require("crypto");
var http = require("http");
var iconv = require('iconv-lite');
var moment=require("moment");
var sendparam = new Params();
function Params(name) {
  this.app_key = "12345678";
  this.fields = "num_iid,title,nick,price,num";
  this.format = "json";
  this.method = "taobao.item.seller.get";
  this.num_iid = "11223344";
  this.session = "test";
  this.sign_method = "md5";
  this.timestamp ="";
  this.v = "2.0";
}
function str2hex(str) {
  let md5 = crypto.createHash("md5");
  let saltbf = "helloworld" + str + "helloworld";
  let pwd = md5.update(saltbf).digest("hex");
  return pwd;
}
function strSticker() {
  let data = "";
  let date=moment().format("YYYY-MM-DD HH:mm:ss");
  sendparam.timestamp=date;
  for (var attr in sendparam) {
    data += attr + sendparam[attr];
  }
  return data;
}
function urlSticker() {
  let primeUrl = "/router/rest?"
  let data = "";
  for (var attr in sendparam) {
    data += attr + "=" + encodeURIComponent(sendparam[attr]) + "&";
  }
  let temp=sendparam.timestamp.split(" ");
  let timestamp="timestamp="+temp[0]+"+"+encodeURIComponent(temp[1])+"&";
  let url=primeUrl+data+timestamp+"sign="+str2hex(strSticker());
  return url;
}
console.log(urlSticker())
var option={
  hostname:"gw.api.taobao.com",
  headers:{
           "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
          }
}
option.path=urlSticker();
console.log(option)
var req=http.request(option,function(res){
    var temp=[];
    res.setEncoding("binary")
    var status=res.statusCode;
    var header=JSON.stringify(res.headers);
    console.log("请求状态:"+status);
    console.log("HTTP头:"+"\n"+header);
    res.on("data",function(chunk){
        temp+=chunk;
    })
    res.on("end",function(){
      var buf = new Buffer(temp,'binary');
      var str = iconv.decode(buf,'gbk');
      console.log("响应内容\n"+str)
      console.log("GET请求已完成")
    })
})
req.end();
