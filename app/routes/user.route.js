const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const config = require('../../configs/config')

const router = express.Router();



router.use( (rep, res, next) => {
        console.log("A request came in to user.route...")
        next();
    });

router.get('/users/testapi',function(req,res){

    const resObject = {
        message: "Test API in user.route is working",
        user: req.user
    }

    return res.send(resObject)
    })



// 更新
router.patch('/users/update',function(req,res){

        var myDate = new Date();
        var date=myDate.toLocaleDateString( );// 获取日期与时间

    //res.json({message: "hello1"})
    

    //user can update their own accounts 
    //by providing the email and cooresponding old password 
    //they can update all fields, except role. 
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({
                success: false,
                message: "User not found"
            })
        } else {
            user.comparePassword(req.body.old_password,function(err, isMatch) {
                if (isMatch) {
                    
                    //res.json({message: "hello2"})

                    user.set({
                        password:req.body.password,
                        email: req.body.new_email,
                        user_name: req.body.user_name, 
                        last_name: req.body.last_name, 
                        first_name: req.body.first_name,
                        updated_date: date,

                        //manually create owner and admin 
                        //role: req.body.role 


                    })
                   
                    user.save()
            
                    res.status(200)
                    res.send(user);
                
                } else {
                    res.status(401).send({
                        success: false,
                        message: 'Your Old Password is Wrong'
                    })
                }
            })
        }
    })       

    
    /*
        User.findById(req.params.userId)
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });            
                }
        
        user.email= req.body.email,
        //user.password= req.body.password,

        //user.set(password, req.body.password)

        user.user_name= req.body.user_name, 
        user.last_name= req.body.last_name, 
        user.first_name= req.body.first_name, 

        user.role= req.body.role, 

        //created_date: date, 
        user.updated_date= date

        user.set({
            password:req.body.password
        })
       
        user.save()

        res.status(200)
        res.send(user);

        //res.json({message:"hello"})

            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });                
                }
                
            })
            .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
            });
            */

        /*
        User.findByIdAndUpdate(req.params.userId,
            {

        email:req.body.email,
        password:req.body.password,

        user_name: req.body.user_name, 
        last_name: req.body.password,
        first_name: req.body.first_name, 

        //role: req.body.role, 

        //created_date: date, 
        updated_date: date
               
            },{new: true})
                
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: "User not found with id " + req.params.userId
                        });            
                    }
                    
                    res.status(200)
                    res.send({message: "User updated"});
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + req.params.userId
                        });                
                    }
                
                })
                .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
                });
                */

})

// 查看一个
router.get('/admin/users/:userId',function(req,res){

    //res.json({message:User.findById(req.params.userId).role})

    //Update user.route.js, admin can view a user's info by puting it's id in url path
    if (req.user.checkAdmin(req.user.role)) {

            User.findById(req.params.userId)
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });            
                }
                res.status(200)
                res.send(user);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });                
                }
                
            })
            .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
            });

    } else {
        res.status(401)
        res.json({
            success: false,
            message: "You are not an admin, therefore you can not view an user's infomation"
        })
    }



        
    })



// 查看所有
router.get('/admin/users',function(req,res){
    
    //res.json({message: res.header.master_key})
    /*
    if (req.user.checkAdmin(req.user.role)) {
        //res.json({message:"im admin!"})
    } else {
        //res.json({message:"im NOT admin!"})
    }
    */


    //Update user.route.js, admin can view all users 
   if (req.user.checkAdmin(req.user.role)) {
    //res.json({message:"im admin!"})
    User.find({})
    .then(function(users) {
        res.status(200)
        res.json(users)
    })
    .catch(function(err) {
        res.status(500)
        res.json({
            success:false,
            message:"Get users failed!"
        })
    })
} else {
    //res.json({message:"im NOT admin!"})
    res.status(401)
        res.json({
            success: false,
            message: "You are not an admin, therefore you can not view all users' infomation"
        })
}

    
})


// 删除一个
router.delete('/admin/users/:userId',function(req,res){

    //Update user.route.js, admin can delete a user
    if (req.user.checkAdmin(req.user.role)) {
        //res.json({message:"im admin!"})
        console.log('delete user');
        User.findByIdAndRemove(req.params.userId)
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: "User not found with id " + req.params.userId
                        });            
                    }
                    res.status(200)
                    res.send({message: "user deleted successfully!"});
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + req.params.userId
                        });                
                    }
                
                })
                .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
                });
    } else {
        //res.json({message:"im NOT admin!"})
        res.status(401)
        res.json({
            success: false,
            message: "You are not an admin, therefore you can not delete any user"
        })
    }

        
    })



/*
//删除全部
router.delete('/admin/users',function(req,res){
        console.log('delete all users');
        User.collection.deleteMany()
            .then(function() {
                res.status(200)
                res.send({message: "All users deleted successfully!"})
            })
            .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
            });
        
                
    })


*/



    
// 更新
router.patch('/admin/users/:userId',function(req,res){


    var myDate = new Date();
    var date=myDate.toLocaleDateString( );// 获取日期与时间
       


    //Update user.route.js, admin can edit a user, including changing its role
    if (req.user.checkAdmin(req.user.role)) {
        //res.json({message:"im admin!"})
        User.findById(req.params.userId)
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });            
                }
        
        user.email= req.body.email,
        //user.password= req.body.password,

        //user.set(password, req.body.password)

        user.user_name= req.body.user_name, 
        user.last_name= req.body.last_name, 
        user.first_name= req.body.first_name, 

        user.role= req.body.role, 

        //created_date: date, 
        user.updated_date= date

        user.set({
            password:req.body.password
        })
       
        user.save()

        res.status(200)
        res.send(user);

        //res.json({message:"hello"})

            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });                
                }
                
            })
            .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
            });
    } else {
        //res.json({message:"im NOT admin!"})
        res.status(401)
        res.json({
            success: false,
            message: "You are not an admin, therefore you can not edit any user"
        })
    }

    




        /*
        User.findByIdAndUpdate(req.params.userId,
            {

        email:req.body.email,
        password:req.body.password,

        user_name: req.body.user_name, 
        last_name: req.body.last_name, 
        first_name: req.body.first_name, 

        role: req.body.role, 

        //created_date: date, 
        updated_date: date
               
            },{new: true})
    

                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: "User not found with id " + req.params.userId
                        });            
                    }
                    
                    res.status(200)
                    res.send({message: "User updated"});
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + req.params.userId
                        });                
                    }
                
                })
                .catch(function(err) {
                res.status(500)
                res.json({success: false, error: err})
                });
                */

})




module.exports = router;



