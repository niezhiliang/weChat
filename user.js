
function User() {
    //用户名
    var uasername;
    //图片地址
    var img;
    //发送的信息
    var msg;
    //图片下标
    var imgindex;
    //用户的信息集合
    var users;
    //用户对应的连接key
    var socketkey;


    this.setUserName = function (name) {
        this.username = name;
    }
    this.getUserName = function () {
        return this.username;
    }

    this.setImg = function (imgpath) {
        this.img = imgpath;
    }
    this.getImg = function () {
        return this.img;
    }

    this.setMsg = function (message) {
        this.msg = message;
    }
    this.getMsg = function () {
        return this.msg
    }

    this.setImgIndex = function (index) {
        this.imgindex = index
    }
    this.getImgIndex = function () {
        return this.imgindex;
    }

    this.setUsers = function (usersArray) {
        this.users = usersArray;
    }
    this.getUsers = function () {
        return this.users;
    }

    this.seSocketkey = function (key) {
        this.socketkey = key;
    }
    this.getSocketKey = function () {
        return this.socketkey;
    }
}

module.exports  = User;
