

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
        
    };

    static getOneProduct(token, id) {
        console.log("token is: " + token); 
        console.log("id is: " + id);
        return new Promise((resolve, reject) => {
            axios
                .get(API_URL + "/" + id, { headers: { authorization: token } }) 
                .then((res) => {
                    console.log("Service return success");
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("Service return failure");
                    reject(err);
                });
        });

    };

    static createOneProduct(token, product) {
        console.log("token is: " + token);
        console.log("product is: " + product);
        return new Promise((resolve, reject) => {
            
            axios
                .post(API_URL, {
                    headers: { authorization: token }, 
                    data: {
                        link: product.link,
                        description: product.description,
                        image: product.image,
                        product_name: product.product_name,
                        price: product.price,
                    }
                }
                   
            )
            

            
                
                .then((res) => {
                    console.log("Service return success");
                    resolve(res.data.product);

                    console.log(product.link,
                        product.description,
                        product.image,
                        product.product_name,
                        product.price);
                    
                })
                .catch((err) => {
                    console.log("Service return failure");
                    reject(err);
                    console.log(product.link,
                        product.description,
                        product.image,
                        product.product_name,
                        product.price);
                });
        });

    }


}
export default ProductService;