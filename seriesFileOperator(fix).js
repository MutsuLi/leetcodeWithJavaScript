const thenJs = require('thenJs');
const fs = require("fs");
const filelist = ['E:/test/1.txt', 'E:/test/2.txt', 'E:/test/3.txt', 'E:/test/4.txt', 'E:/test/5.txt']
const writeText = ['bb']
thenJs.eachSeries(filelist, (cont, file) => {
    fs.access(file, (err) => {
        if (err) return cont(err);
        console.log("正在查找：" + file);
        cont(null, `文件${file}存在`)
    });
}, true)
    .then((cont) => {
        thenJs.eachSeries(filelist, (cont, file) => {
            fs.writeFile(file, writeText, (err) => {
                if (err) return cont(err);
                console.log("正在删除：" + file);
                cont(null, `文件${file}已删除`)
            });
        }, true).fin(()=>{cont()})
    }
    )
    .then((cont) => {
        thenJs.eachSeries(filelist, (cont, file) => {
            fs.writeFile(file, writeText, (err) => {
                if (err) return cont(err);
                console.log("正在写入：" + file);
                cont(null, `${writeText}已写入文件${file}`);
            });
        }, true).fin(()=>{cont()})
    }
    )
    .then((cont) => {
        thenJs.eachSeries(filelist, (cont, file) => {
            fs.readFile(file, (err, data) => {
                if (err) return cont(err);
                console.log("正在读取：" + file);
                cont(null, `文件内容为：${data.toString()}`);
            });
        }, true).fin(()=>{cont()})
    });