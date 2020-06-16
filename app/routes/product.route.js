var express = require('express');
var models = require('../models/index.models')
var Product = models.Product
var router = express.Router();

router.use( (rep, res, next) => {
        console.log("A request came in to product.route...")
        next();
    });

router.get('/products/testapi',function(req,res){

    const resObject = {
        message: "Test API in product.route is working",
        //user: req.user
    }

    return res.send(resObject)
    })


// 添加
router.post('/products',function(req,res){
    

    //check if product name is provided 
    if (!req.body.product_name) {
        res.status(400)
        res.json({succuss: false, error: "Missing Product name"})
    } 

    else {
    
            //var title = req.body.title;
    var myDate = new Date();
    var date=myDate.toLocaleDateString( );// 获取日期与时间
    
    
    //var product_id= req.body.product_id;
    var product_name= req.body.product_name;
    var price= req.body.price;
    var description= req.body.description;
    var image= req.body.image;
    var link= req.body.link;
    var created_date= date;
    //var updated_date= req.body.updated_date;
    //var user_id= req.body.user_id;
    //var list_id= req.body.list_id;

    
    console.log(req);
    var Productt = new Product({
        //title:title,
        
        //product_id:product_id,
        product_name:product_name,
        price:price,
        description:description,
        image:image,
        link:link,
        created_date:created_date,
        updated_date: "No updates since created",
        //user_id:user_id,
        //list_id:list_id,
        author: req.user._id
    })

    Productt.save()
    .then(
        res.status(200),
        res.json(Productt)
    )
    .catch(function(err) {
        res.status(500)
        res.json({
            success:false,
            message:"Add product failed!"
        })
    })

    }



    /*
    Productt.save(function(err){
        if(err){

            res.json({
                success:false,
                message:"Add product failed!"
            })
        }
    })
    //res.status(200)
    res.json({message:"Add product successfully!"})
    */
    
})



// 查看所有
router.get('/products',function(_req,res){
    /*
        var myDate = new Date();
        var date=myDate.toLocaleDateString( );// 获取日期与时间
    */
    
    Product.find({})
    .then(function(products) {
        res.status(200)
        res.json(products)
    })
    .catch(function(err) {
        res.status(500)
        res.json({
            success:false,
            message:"Get products failed!"
        })
    })

    /*
        Product.find({},function(err,products){
            //res.json({
            //    success:true,
            //    data:products
            //})
            //res.json(products)
            
            res.send(products)
           
        })
    */
})

    
    


// 查看一个
router.get('/products/:productId',function(req,res){


        //res.send("This is a signle product: " + req.params.productId)
        Product.findById(req.params.productId)
        .populate('author', 'email')
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });            
            }
            res.status(200)
            res.send(product);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });                
            }
            
        })
        .catch(function(err) {
            res.status(500)
            res.json({success: false, error: err})
        });
        
    })



// 更新
router.patch('/products/:productId',function(req,res){


    //res.json({message: res.user})

     Product.findById(req.params.productId)
    //this populate will show author's email when we get one product 
        .populate('author', 'email')
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });            
            }
    //res.send(product.author._id)
    //res.send(req.user._id)

    console.log("checking ownership")
    console.log(req.user._id)
    console.log(product.author._id)
    
    //console.log(req.user.email)
    //console.log(product.author.email)
    
    //can not compare object id with ==
    //if (req.user._id == product.author._id) {

    //only the owner of this product or admin can edit this product 
    if (req.user._id.equals(product.author._id) || req.user.checkAdmin(req.user.role)) {
        console.log("yes")
        //res.json({message: "Current user IS owner" + "||" + req.user._id + "||" + product.author._id})
        
        var myDate = new Date();
        var date=myDate.toLocaleDateString( );// 获取日期与时间
           
        product.product_name= req.body.product_name;
        product.price= req.body.price;
        product.description= req.body.description;
        product.image= req.body.image;
        product.link= req.body.link;
        product.updated_date= date;
        
        product.save()
        res.status(200)
        res.send({message: "Product Updated", product});
        

    } else {
        console.log("no")
        //res.json({message: "Current user is NOT owner"  + "||" + req.user._id + "||" + product.author._id})
        res.status(401)
        res.json({
            success: false,
            message: "You are not an admin nor the owner of this product, therefore you can not edit it"
        })

    }

    /*
    if (req.user.checkOwner(product.author._id)) {
        res.json({message: "Current user IS owner" })
    } else {
        res.json({message: "Current user is NOT owner" })
    }
    */




        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });                
            }
            
        })
        .catch(function(err) {
            res.status(500)
            res.json({success: false, error: err})
        });


    /*
    
        if (!req.body.product_name) {
            res.status(400)
            res.json({succuss: false, error: "Missing product's new name"})
        } 
    
        else {
                
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


                            
                            res.status(200)
                            res.send({message: "Product updated"});
                        }).catch(err => {
                            if(err.kind === 'ObjectId') {
                                return res.status(404).send({
                                    message: "Product not found with id " + req.params.productId
                                });                
                            }
                        
                        })
                        .catch(function(err) {
                        res.status(500)
                        res.json({success: false, error: err})
                        });
        
        }
*/

  



    })

    


// 删除一个
router.delete('/products/:productId',function(req,res){
        console.log('delete product');


    
     Product.findById(req.params.productId)
        //.populate('author', 'email')
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });            
            }
    
    //console.log(req.user.email)
    //console.log(product.author.email)
    
    //can not compare object id with ==
    //if (req.user._id == product.author._id) {

    //only product owner or admin can delete one product 
    if (req.user._id.equals(product.author._id) || req.user.checkAdmin(req.user.role)) {
        console.log("yes")
        //res.json({message: "Current user IS owner" + "||" + req.user._id + "||" + product.author._id})
        //res.json({message: "hello"})
        product.remove()
        res.status(200)
        res.send({message: "Product deleted successfully!"});

    } else {
        console.log("no")
        //res.json({message: "Current user is NOT owner"  + "||" + req.user._id + "||" + product.author._id})
        res.status(401)
        res.json({
            success: false,
            message: "You are not an admin nor the owner of this product, therefore you can not delete it"
        })

    }



        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });                
            }
            
        })
        .catch(function(err) {
            res.status(500)
            res.json({success: false, error: err})
        });


/*
        Product.findByIdAndRemove(req.params.productId)
                .then(product => {
                    if(!product) {
                        return res.status(404).send({
                            message: "Product not found with id " + req.params.productId
                        });            
                    }
                    res.status(200)
                    res.send({message: "Product deleted successfully!"});
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Product not found with id " + req.params.productId
                        });                
                    }
                
                })
                .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
                });
                */
    })




//删除全部
router.delete('/products',function(req,res){
    console.log('delete all products');

//only admin can delete all products at once 
if (req.user.checkAdmin(req.user.role)) {

    Product.collection.deleteMany()
        .then(function() {
            res.status(200)
            res.send({message: "All product deleted successfully!"})
        })
        .catch(function(err) {
            res.status(500)
            res.json({success: false, error: err})
        });

} else {
        res.status(401)
        res.json({
            success: false,
            message: "You are not an admin, therefore you can not delete all products"
        })
}
   

    
    
            
})

module.exports = router;








