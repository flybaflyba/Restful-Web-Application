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
      
        Product.find({},function(err,products){
            //res.json({
            //    success:true,
            //    data:products
            //})
            //res.json(products)
            
            res.send(products)
           
        })
    })

    router.get('/testapi',function(req,res){

        res.send({message:"Test API is working"})
       
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



// 更新
router.patch('/products/:productId',function(req,res){
        var myDate = new Date();
        var date=myDate.toLocaleDateString( );// 获取日期与时间
        var product_id= req.body.product_id;
        var product_name= req.body.product_name;
        var price= req.body.price;
        var description= req.body.description;
        var image= req.body.image;
        var link= req.body.link;
        //var created_date= req.body.created_date;
        var updated_date= date;
        var user_id= req.body.user_id;
        var list_id= req.body.list_id;
        
        Product.findByIdAndUpdate(req.params.productId,
            {product_id:product_id,
            product_name:product_name,
            price:price,
            description:description,
            image:image,
            link:link,
            //created_date:created_date,
            updated_date: updated_date,
            user_id:user_id,
            list_id:list_id        
            },{new: true})
                .then(product => {
                    if(!product) {
                        return res.status(404).send({
                            message: "Product not found with id " + req.params.productId
                        });            
                    }
                    
                
                    res.send({message: "Product updated"});
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Product not found with id " + req.params.productId
                        });                
                    }
                
                });
                /*
            function(err,product){
            if(err){
                res.json({
                    success:false,message:"更新失败"
                })
            }
        })
        res.json({success:true,message:"更新成功"})
        */
    })

    


// 删除一个
router.delete('/products/:productId',function(req,res){
        console.log('delete product');
        Product.findByIdAndRemove(req.params.productId)
                .then(product => {
                    if(!product) {
                        return res.status(404).send({
                            message: "Product not found with id " + req.params.productId
                        });            
                    }
                    res.send({message: "Product deleted successfully!"});
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Product not found with id " + req.params.productId
                        });                
                    }
                
                });
    })


//删除全部
router.delete('/products',function(req,res){
    console.log('delete all products');
    Product.collection.deleteMany();
    res.send({message: "All product deleted successfully!"});
            
})

module.exports = router;