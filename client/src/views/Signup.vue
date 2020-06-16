<template>
  <div class="signup">
    <h1>Signup</h1>
    

    <form class="signUpForm" @submit.prevent="handleSignup">
        <div v-if="message" id="message">{{ message }}</div>

        <div class="form_row">
            <label class="lable" for="last_name">Last Name </label>
            <input class="input" type="text" name="last_name" v-model="last_name" />
        </div>

        <div class="form_row">
            <label class="lable" for="first_name">First Name </label>
            <input class="input" type="text" name="first_name" v-model="first_name" />
        </div>

        <div class="form_row">
            <label class="lable" for="user_name">User Name* </label>
            <input class="input" type="text" name="user_name" v-model="user_name" />
        </div>

        <div class="form_row">
            <label class="lable" for="email">Email* </label>
            <input class="input" type="email" name="email" v-model="email" />
        </div>

        <div class="form_row">
            <label class="lable" for="password">Password* </label>
            <input class="input" type="text" name="password" v-model="password" />
        </div>
        
        <p>Required fields are marked with *</p>
        <div class="form_row">
            <button class="btn btn-primary" :disabled="submitted">
                <span>Sign Up</span>
            </button>
        </div>
    </form>


  </div>
</template>

<script>

import AuthServive from "@/services/auth"

export default {
    name: "Signup",
    data() {
        return {
        submitted: false,
        message: "",
        email: "",
        password: "",
        user_name: "",
        last_name: "",
        first_name: "",
    }
    },
    methods: {
        handleSignup() {
            console.log("Sign Up Pressed");
            this.submitted = true;

            var user = {
                email: this.email,
                password: this.password,
                user_name: this.user_name,
                last_name: this.last_name,
                first_name: this.first_name,

            }


            if (this.email != "" && this.password != "" && this.user_name != "") {
                //this.message = "I should send data to API";

                AuthServive.signup(
                    user
                    //"hello"
                    //email: this.email,
                    //password: this.password,
                    //email: "helloemail",
                    //password: "hellopassword",
                )
                    .then((user) => {
                        
                        console.log(user);
                        //this.message = "User Created"
                        this.$router.push("/login") //bring the user to login page after then sign up 
                    }) 
                    .catch((err) => {
                        console.log(err);
                        this.message = "User name or email is already taken";
                        this.submitted = false;
                    })


            } else {
                this.message = "User name, email or password missing";
                this.submitted = false;
            }



            
        }
    }
}
</script>


<style scoped>
.signUpForm {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}



</style>