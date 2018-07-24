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
        return false;
    }

    /**
     * 新连接用户获取头像
     * @param users 已经在线的用户数组
     */
    this.getImg = function (name) {

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
                user.setUserName(name)
                //添加用户信息
                users.push(user);
                user.setUsers(JSON.stringify(users));
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

    /**
     * 判断某值是否存在数组中
     * @param arr
     * @param value
     * @returns {boolean}
     */
    this.arrayIsInclud = function (arr,value) {
        for(var i = 0; i < arr.length; i++){
            if(value === arr[i]){
                return true;
            }
        }
        return false;
    }

    /**
     * 删除数组中某个值并返回
     * @param array
     * @param value
     * @returns {*}
     */
    this.deleteArrayItem = function (arr,value) {
        for (var i =0; i < arr.length; i++){
            if (arr[i] == value) {
                var temp = arr[i];
                arr[i] = arr[arr.length-1];
                arr[arr.length-1] = temp;
                arr.pop();
            }
        }

        return arr;
    }

    /**
     * 删除某个用户 测试成功
     * @param username
     */
    this.deleteSomeOne = function (username) {
        console.log(users.length)
        for (var i = 0; i < users.length; i++) {
            var obj = users[i];
            if (obj.username == username) {
                var temp = users[i];
                users[i] = users[users.length-1];
                users[users.length-1] = temp;
            }
        }
        users.pop();

        for (obj in users) {
            console.log(obj)
        }
    }

}

module.exports  = Utils

