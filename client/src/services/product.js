

//this file communicates with our api 

import axios from 'axios';

const API_URL = "http://localhost:3000/api/products";

class ProductService {
    static getProducts(token) {
        console.log("token is: " + token); //debug...whats the token 
        return new Promise((resolve, reject) => {
            axios
                .get(API_URL, { headers: { authorization: token } }) //pass in the token in the header when we request 
                .then((res) => {
                    console.log("Service return success");
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("Service return failure");
                    reject(err);
                });
        });
        
    }

    
}
export default ProductService;