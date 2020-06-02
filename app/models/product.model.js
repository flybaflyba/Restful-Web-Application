const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
 
    //product_id: String, 
    product_name: {
        type: String,
        required: true
    }, 
    price: String, 
    description: String, 
    image: String, 
    link: String, 
    created_date: String, 
    updated_date: String, 
    //user_id: String, 
    list_id: String,

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});
module.exports = mongoose.model('Product', ProductSchema);