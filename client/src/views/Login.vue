<template>
  <div class="login">
    <h1>Login</h1>

<form class="loginForm" @submit.prevent="handleLogin">

     <div v-if="message" id="message">{{ message }}</div>

        <div class="form_row">
            <label for="email">Email: </label>
            <input type="email" name="email" v-model="email" />
        </div>

        <div class="form_row">
            <label for="password">Password: </label>
            <input type="password" name="password" v-model="password" />
        </div>
        
        <p>Required fields are marked with *</p>
        <div class="form_row">
            <button :disabled="submitted">
                <span>Login</span>
            </button>
        </div>
    </form>


  </div>
</template>



<script>

import AuthServive from "@/services/auth"

export default {
    name: "Login",
    data() {
        return {
        submitted: false,
        message: "",
        email: "",
        password: "",
    }
    },
    methods: {
        handleLogin() {
            console.log("Sign Up Pressed");
            this.submitted = true;

            var user = {
                email: this.email,
                password: this.password,
            }

            if (this.email != "" && this.password != "" && this.user_name != "") {
                //this.message = "I should send data to API";
                console.log("Sending login request");

                AuthServive.login(
                    user
                )
                    .then((token) => {
                        console.log(token);
                        this.message = "Logged in"
                    }) 
                    .catch(err => {
                        console.log(err);
                        this.message = "Invalid Email/Password";
                        this.submitted = false;
                    });

            } else {
                this.message = "Email or password missing";
                this.submitted = false;
            }

            
        }
    }
}
</script>