const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const config = require('../../configs/config')

const router = express.Router();

//anyone can sigg up 
router.post('/signup', (req, res) => {
    if (! req.body.email || ! req.body.password) {
        res.status(400)
        res.json({success: false, messahe: "Email and Passport Required"})
    } else {

        var myDate = new Date();
        var date=myDate.toLocaleDateString( );// 获取日期与时间

        const newUser = new User ({
            email:req.body.email,
            password:req.body.password,

            user_name: req.body.user_name, 
            last_name: req.body.last_name, 
            first_name: req.body.first_name, 

            role: "user",

            created_date: date, 
            updated_date: "no updates since created"

        })
        newUser.save((err) => {
            if (err) {
                console.log(err)
                res.status(400)
                //they can not use an email thats in the system 
                return res.json({
                    success: false, 
                    message: "Email already exists"
                })
            }
            res.json({
                success: true,
                message: "User Created",
                User: newUser
            })
        })
    }
})

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({
                success: false,
                message: "User not found"
            })
        } else {
            //we compare the password in the system and whats being provided 
            user.comparePassword(req.body.password,function(err, isMatch) {
                if (isMatch) {
                    const tokenObj = {_id: user._id, email: user.email}
                    const token = jwt.sign(tokenObj, config.secret)
                    res.send({
                        success: true,
                        token: "JWT " + token
                    }) 
                } else {
                    res.status(401).send({
                        success: false,
                        message: 'Wrong Password'
                    })
                }
            })
        }
    })
})





module.exports = router;