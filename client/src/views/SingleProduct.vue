<template>
<div>
    <h1>This is a single product view</h1>
    
    <h2>Product Name: {{ product.product_name }}</h2>

    <p> Price: {{ product.price }}</p>
    <p> Created on: {{ product.created_date }}</p>
    <p> Updated on: {{ product.updated_date }}</p>
    
    <p> Link: {{ product.link }}</p>
    
    <p> Image link: {{ product.image }}</p>

    <p> Description: {{ product.description }}</p>

    <!-- 
    <p> Contact Creator at: {{ product.author.email }}</p> 
    -->

</div>
</template>

<script>
import ProductService from '@/services/product';
export default {
    
    data(){
        return {
            product: {},
            message: "Loading Single Product",
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
}
</script>