<template>
<div>
    
    <div class="message" v-if="this.message">
            {{ this.message }}
        </div>
    

    <div v-if="this.deleteMessage">
            {{ this.deleteMessage }}
        </div>
    <button class="btn btn-primary" v-if="!this.deleteMessage" @click="deleteOneProduct()"> Delete this product </button>
    <router-link v-if="this.deleteMessage" :to="{name:'Products'}"> View All Products </router-link>

<!--add this v-if so that product details not show once it's deleted -->
<div v-if="!this.deleteMessage">
    <h2>{{ product.product_name }}</h2>

<div>

    <img class="img" :src= product.image  alt="Image not load" >
<ul > 

    <li> Price: {{ product.price }}</li>
    <li> Created on: {{ product.created_date }}</li>
    <li> Updated on: {{ product.updated_date }}</li>
    <li @click="See(product.link)">See it on its Shop</li>

</ul>


 </div>   
    <!-- 
    <p> Link: {{ product.link }}</p> 
    -->
    
    
    <!-- 
    <p> Image link: {{ product.image }}</p>
    -->




        <div class="product-details">
            
            <p class="description"> Description: {{ product.description }}</p>
        </div>

   
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
img {
  
    height: auto;
    width: 40%;
   

}
.product-details {
    display: flex;
    justify-content: space-between;
}

.description {
    margin: 0 40px;
    font-size: 20px;
    text-align: left;
    

}

ul {
    width: 50%;
    
    float: right;
    text-align: center;
    padding: 40px;
    font-size: 35px;

    
}

li {
    list-style-type: none;
    text-align: left;
}

</style>