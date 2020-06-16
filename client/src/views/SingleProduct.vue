<template>
<div>
    <h1>This is a single product view</h1>
    <div class="message" v-if="this.message">
            {{ this.message }}
        </div>
    

    <div v-if="this.deleteMessage">
            {{ this.deleteMessage }}
        </div>
    <button v-if="!this.deleteMessage" @click="deleteOneProduct()"> Delete this product </button>
    <router-link v-if="this.deleteMessage" :to="{name:'Products'}"> View All Products </router-link>

<!--add this v-if so that product details not show once it's deleted -->
<div v-if="!this.deleteMessage">
    <h2>Product Name: {{ product.product_name }}</h2>

    <p> Price: {{ product.price }}</p>
    <p> Created on: {{ product.created_date }}</p>
    <p> Updated on: {{ product.updated_date }}</p>
    
    <!-- 
    <p> Link: {{ product.link }}</p> 
    -->
    
    <p @click="See(product.link)">See it on its Shop</p>
    
    <!-- 
    <p> Image link: {{ product.image }}</p>
    -->

    <p> <img class="img" :src= product.image  alt="Image not load" > </p>


    <p> Description: {{ product.description }}</p>

    <!-- 
    <p> Contact Creator at: {{ product.author.email }}</p> 
    -->
</div>
</div>
</template>

<script>
import ProductService from '@/services/product';
export default {
    
    data(){
        return {
            product: {},
            message: "Loading Single Product",
            deleteMessage: "",
            
            
           
        }
    },
    computed: {



        // destination() {
        //     return store.destinations.find(
        //         //destination => destination.id === this.destinationId
        //         destination => destination.slug === this.slug
        //     )
        // }
    },

    props: {
        productId: {
            type: String,
            required: true
        }
    },

    mounted() {
        console.log("Load Single Product Here")
        if (this.$store.getters.loggedIn) {
            const token = this.$store.getters.token;
            ProductService.getOneProduct(token, this.productId)
                .then((data) => {
                    this.product = data;
                    this.message = null;
                })
                .catch((err) => {
                    console.log("Error getting single product", err);
                    this.message = "Error getting single product"
                });

        } else {
            this.message = "You must login first";
        }
    },

    methods: {
         See (e) {
        window.location.href = e;
      },
        deleteOneProduct() {
            console.log("ready to delete");
            const token = this.$store.getters.token;
            ProductService.deleteOneProduct(token, this.productId)
                .then(() => {
                    this.deleteMessage = "Product Deleted";

                })
                .catch((err) => {
                    console.log("Error deleting single product", err);
                    this.deleteMessage = "You can not delete this product because you are not the owner nor admin"
                });
      }
    },
    
}
</script>

<style scoped>
.img {
    max-height: 200px;
}
</style>