var  ws = require('nodejs-websocket');

var server = ws.createServer(function (conn) {

    conn.on('text',function (str) {
        console.log(str+"----1")
        console.log(server.clients.length+"-6")
        conn.sendText("520")
    })

    conn.on('close',function (code,reason) {
        console.log("关闭连接")
    })

    conn.on('error',function (code,reason) {
        console.log("异常关闭")
    })

}).listen(8080);
console.log('websocket初始化完成')

