<template>
  <div class="createNewProduct">
    <h2>You Can Create a Product Here</h2>



    <form class="createNewProductForm" @submit.prevent="handleCreateNewProduct">

        <div v-if="message" id="message">{{ message }}</div>
        <router-link v-if="this.message" :to="{name:'Products'}"> View All Products </router-link>


        <div class="form_row">
            <label class="lable" for="product_name">Product Name: </label>
            <input class="input" type="text" name="product_name" v-model="product_name" />
        </div>

        <div class="form_row">
            <label class="lable" for="price">Price: </label>
            <input class="input" type="text" name="price" v-model="price" />
        </div>

        <div class="form_row">
            <label class="lable" for="image">Image Link: </label>
            <input class="input" type="text" name="image" v-model="image" />
        </div>

        <div class="form_row">
            <label class="lable" for="link">Link: </label>
            <input class="input" type="text" name="link" v-model="link" />
        </div>

        <div class="form_row">
            <label class="lable" for="description">Description: </label>
            <textarea class="input" id="descriptionCell" rows="8" cols="30" name="description" v-model="description" />
        </div>
        
        <p>All fields must be filled</p>
        <div class="form_row">
            <button class="btn btn-primary" :disabled="submitted">
                <span>Create</span>
            </button>
        </div>
    </form>


  </div>


</template>

<script>

import ProductService from '@/services/product';

export default {
    name: "Signup",
    data() {
        return {
        submitted: false,
        message: "",
        link: "",
        description: "",
        image: "",
        product_name: "",
        price: "",
    }
    },
    methods: {
        handleCreateNewProduct() {
            console.log("Create Product Pressed");
            this.submitted = true;

            var product = {
                link: this.link,
                description: this.description,
                image: this.image,
                product_name: this.product_name,
                price: this.price,

            }


            if (this.link != "" && this.description != "" && this.image != "" && this.product_name != "" && this.price != "") {
                //this.message = "I should send data to API";
                const token = this.$store.getters.token;

                ProductService.createOneProduct(
                    token, product
                )
                    .then((product) => {
                        console.log(product);
                        this.message = "Product Created"
                    }) 
                    .catch((err) => {
                        console.log(err);
                        this.message = "Create product failed";
                        this.submitted = false;
                    })


            } else {
                this.message = "One or more field(s) missing";
                this.submitted = false;
            }



            
        }
    }
}
</script>

<style scoped>
.createNewProductForm {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}





</style>