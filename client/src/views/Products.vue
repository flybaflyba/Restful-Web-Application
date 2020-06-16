
<!--this is out product page -->

<template>
    <div class="products">

        <router-link
                :to="{name:'CreateAProduct'}"                       
               >
                Click Here to Share a Product
        </router-link>

        <h2>Products</h2>
        <div class="message" v-if="this.message">
            {{ this.message }}
        </div>

        <div id="products">
            <div class="product" v-for="product in this.products" :key="product._id">

                 <router-link 
                :to="{name:'SingleProduct', params: { productId: product._id} }"  
                                        
               >
                {{product.product_name}}
                </router-link>

                <!-- 
                <p>{{ product._id }}</p>
                -->


                
            
            </div>
        </div>

    </div>
</template>

<script>
import ProductService from '@/services/product';
export default {
    data() {
        return {
            products: [],
            message: "Loading Products",
        };
    },
    mounted() {
        console.log("Load Products Here")
        if (this.$store.getters.loggedIn) {
            const token = this.$store.getters.token;
            ProductService.getProducts(token)
                .then((data) => {
                    this.products = data;
                    this.message = null;
                })
                .catch((err) => {
                    console.log("Error getting products", err);
                    this.message = "Error getting products"
                });

        } else {
            this.message = "You must login first";
        }
    },
}
</script>

<style scoped>
.product {
    padding: 30px;
    font-size: 30px;
}
</style>