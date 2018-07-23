var imags = require('./imgConfig')
var User = require('./user')
//存储在线用户
var users = [];

function Utils() {


    /**
     * 查看用户是否在线
     * @param username
     * @returns {boolean}
     */
    this.isExit = function (username) {

        for (i=0; i<users.length;i++) {

            var user = users[i];
            console.log(user.getUserName())
            if (user.getUserName() == username) {
                return true
            }
        }
        var user = new User();
        //第一次连接就加入数组
        user.setUserName(username)
        users.push(user)
        return false;
    }

    /**
     * 新连接用户获取头像
     * @param users 已经在线的用户数组
     */
    this.getImg = function () {

        var user = new User();
        var nums = []

        for (obj in users) {
            nums.push(obj.imgindex)
        }
        while (true) {
            //随机生成一个图片数量以内的随机数
            var index = Math.floor(Math.random()*(imags.imgSize));

            //如果生成头像下标未被使用 则返回图片地址
            if (nums.indexOf(index) == -1) {
                user.setImg(imags.imgArray[index])
                user.setImgIndex(index)
                return user;
            }
        }
    }

    /**
     * 用户刚连接时只发送给他自己
     * @param ws
     */
    this.sendSelf = function (connect,msg) {
        connect.sendText(msg)
    }

    /**
     * 推送给所有在线用户
     * @param server
     */
    this.sendAll = function (server,msg) {
        server.connections.forEach(function(connection) {
            connection.sendText(msg);
        })
    }

}

module.exports  = Utils

