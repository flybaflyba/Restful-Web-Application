const mongoose = require('mongoose');
const bcrypt = require("bcrypt")


const UserSchema = mongoose.Schema({
 
    //user_id: String, 
    user_name: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    }, 

    password: String, 
    //user_name: String,
    last_name: String, 
    first_name: String, 
    
    role: String,
    
    created_date: String, 
    updated_date: String,
    
});


UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        console.log("password being hashed here");
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
        console.log(this.password)
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch)
    })

}

UserSchema.methods.checkAdmin = function(role) {
    if (role == 'admin' || role == "owner") {
        return true
    } else {
        return false
    }
}

UserSchema.methods.checkOwner = function(author_id) {
    console.log("checking ownership")
    console.log(this._id)
    console.log(author_id)
    if (author_id == this._id) {
        console.log("yes")
        return true
    } else {
        console.log("no")
        return false
    }
}


module.exports = mongoose.model('User', UserSchema);