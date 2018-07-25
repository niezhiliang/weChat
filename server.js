var ws = require('nodejs-websocket');
var Utils = require('./utils')

var util = new Utils();

var server = ws.createServer(function (conn) {

    conn.on('text',function (str) {

        user = JSON.parse(str);
        if (util.isExit(user.username)) {
            //发送给所有用户
        } else {
            //设置用户头像
            var name = user.username;
            user= util.getImg(name)
            user.setUserName(name)
            //util.sendSelf(conn,JSON.stringify(user))
        }
        //用户下线
        if(user.msg == 'del_user') {
            util.deleteSomeOne(user.username);
        }
        util.sendAll(server,JSON.stringify(user))

    })

    conn.on('close',function (code,reason) {
        console.log("关闭连接")
    })

    conn.on('error',function (code,reason) {
        console.log("异常关闭")
    })

}).listen(9999);

console.log('websocket初始化完成')

