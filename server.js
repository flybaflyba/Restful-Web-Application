var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要



//配置数据库
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.database, {
    useNewUrlParser: true,
    //Solve DeprecationWarning
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
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

//
//for product: 
var setupRoute = require('./app/routes/product.route');// 导入路由文件
app.use('/',setupRoute);   //设置访问路径
//

var port = process.env.PORT || 8080; // 设置启动端口
// 启动服务
app.listen(port);
console.log('Magic happens at http://localhost:' + port);



