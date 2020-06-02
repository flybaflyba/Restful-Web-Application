var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要

//for all routes: 
var routes = require('./app/routes/index.routes');// 导入路由文件

//const passport = require('./configs/passport');

//get passport
const passport = require('passport');

//const passport;

//get our passport 
require('./configs/passport')(passport)

//配置数据库
// Configuring the database
const dbConfig = require('./configs/config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.database, {
    useNewUrlParser: true,
    //Solve DeprecationWarning
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    

    
    app.use("/api/auth", routes.auth)
    //app.use("/api/users", passport.authenticate('jwt', {session : false}), routes.products)
    
    //passport.authenticate will only allow our users to access these pages 
    app.use("/api", passport.authenticate('jwt', {session : false}), routes.products)  //设置访问路径
    app.use("/api", passport.authenticate('jwt', {session : false}), routes.users)

    var port = process.env.PORT || 8080 // 设置启动端口    
    // 启动服务
    app.listen(port)
    console.log("Successfully connected to the database")
    console.log('Magic happens at http://localhost:' + port)
    
    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();

    
    
});

//app.set('superSecret', dbConfig.secret); // 设置app 的超级密码--用来生成摘要的密码



//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));




//路由
//基础路由
app.get('/',function(req,res){
    res.send("Hello from Litian");
})










