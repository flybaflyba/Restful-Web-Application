var express = require('express');
var Product = require('../models/product.model')
var router = express.Router();

// 添加
router.post('/products',function(req,res){
    
    //var title = req.body.title;
    var myDate = new Date();
    var date=myDate.toLocaleDateString( );// 获取日期与时间
    
    
    var product_id= req.body.product_id;
    var product_name= req.body.product_name;
    var price= req.body.price;
    var description= req.body.description;
    var image= req.body.image;
    var link= req.body.link;
    var created_date= date;
    //var updated_date= req.body.updated_date;
    var user_id= req.body.user_id;
    var list_id= req.body.list_id;
    
    console.log(req);
    var Productt = new Product({
        //title:title,
        
        product_id:product_id,
        product_name:product_name,
        price:price,
        description:description,
        image:image,
        link:link,
        created_date:created_date,
        //updated_date:updated_date,
        user_id:user_id,
        list_id:list_id
    })
    Productt.save(function(err){
        if(err){
            res.json({
                success:false,
                message:"Add product failed!"
            })
        }
    })
    res.json({message:"Add product successfully!"})
    
})
router.use( (rep, res, next) => {
    console.log("A request came in ...")
    next();
});


// 查看所有
router.get('/products',function(_req,res){
    /*
        var myDate = new Date();
        var date=myDate.toLocaleDateString( );// 获取日期与时间
    */
        Product.find({},function(_err,products){
            //res.json({
            //    success:true,
            //    data:products
            //})
            //res.json(products)
            res.send(products)
        })
    })


// 查看一个
router.get('/products/:productId',function(req,res){
        //res.send("This is a signle product: " + req.params.productId)
        Product.findById(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });            
            }
            res.send(product);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });                
            }
            
        });
        
    })

    

module.exports = router;