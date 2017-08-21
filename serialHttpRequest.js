const thenJs = require('thenjs');
var http = require("http");
var iconv = require('iconv-lite');
const fs=require("fs");
const bodyParser=require("body-parser");
const api='/?tab=all&page=';
const options=[];
for(let i = 0; i < 10; ++i){
    let obj = {};
    obj.path = `${api}${i}`;
    obj.headers={
        "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
       }
    obj.hostname="cnodejs.org";
    options.push(obj);
}
thenJs.eachSeries(options,(cont,option)=> {
    // option.path=arg[0]
    console.log(option);
    let temp=http.request(option,(res)=>{
        reqcallback(res,cont);
    });
    temp.end()
    //console.log('访问完成当前页')
},true).fin((cont,err,result)=>{
    console.log('fin',err,result);
});


// for(var i of requestList){
//     console.log(i)
// }
// function task(arg, callback) { // 模拟异步任务
//     thenJs.nextTick(function () {
//       callback(null,req(arg));
//     });
//   }
//   thenJs.eachSeries(requestList, function (cont, value) {
//     task(value, cont);
//   })
//   .then(function (cont, result) {
//     for(let i of result){
//         console.log(i)
//     }
//   });
  function reqcallback(res,cb) {
    let rev = [];
    res.setEncoding("utf-8")
    let status = res.statusCode;
    let header = JSON.stringify(res.headers);
    // console.log("状态码:" + status);
    // console.log("HTTP Header:" + "\n" + header);
    res.on("data", function (chunk) {
        rev += chunk;
    })
    res.on("end", function () {
        //console.log("网页内容" + "\n" + temp)
        fs.writeFile('read.txt', rev,{flags:'a'},function (err) {
            console.log(err,rev.length);
            if (err) return cb(err);
            cb(null,rev);
        });
        // console.log("GET请求已完成")
    })

}
//   function req(arg){
//     option.path=arg[0]
//     let temp=http.request(option,reqcallback);
//     temp.end()
//     console.log('访问完成当前页')
//   } 

