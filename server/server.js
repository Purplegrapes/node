var express = require('express');
// var http = require('http');
// var path = require('path');
var cors = require("cors");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var ejs = require('ejs');
var User = require('./users');
//
var app = express();
var router = express.Router();
app.listen(4040)


app.use('/', router);
var io = require('socket.io')(8080);

mongoose.connect('mongodb://localhost/mydb')     //连接本地数据库blog

var db = mongoose.connection;
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json();
app.use('/api', jsonParser)
// 连接成功

io.on('connection', function(socket){
  //接受客户端传送的sendMessage命令
  socket.on('loginSuccess', function(username){
    console.log(username);  //用户ioUserInfo
    socket.emit('success', `${username}登陆成功`)
  });
  socket.on('loginFailed', function(){
    socket.emit('failed', '登录失败')
  });
})
app.get('/api/userList', function (req, res) {
  var userList = User.find({}, function (err, data) {
    if (err) throw  err;
    res.send(data)
  });
});
app.post('/api/register', function (req, res) {
  console.log(req.body);
  var postData = {
    username: req.body.username,
    password: req.body.password,
  };
  // 查询是否被注册
  User.findOne({username: postData.username}, function (err, data) {
    if (data) {
      res.send('用户名已被注册');
    } else {
      // 保存到数据库
      User.create(postData, function (err, data) {
        if (err) throw err;
        res.send('注册成功');
        // 重定向到所用用户列表
      })
    }
  });
});
app.post('/api/login', function (req, res) {
  console.log(req.body);
  var postData = {
    username: req.body.username,
    password: req.body.password
  };
  User.findOne({
    username: postData.username,
    password: postData.password
  }, function (err, data) {
    if(err) throw err;
    if(data){
      res.send('登录成功');
    }else{
      res.status(500).send({ message: '密码错误'})
    }
  } )
});
db.on('open', function(){
  console.log('MongoDB Connection Successed');
});
// 连接失败
db.on('error', function(){
  console.log('MongoDB Connection Error');
});
// app.listen(3000);
//3. 绑定端口
console.log('启动4040')