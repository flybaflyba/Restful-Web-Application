<template>


    <nav class="nav">
        <p class="logo">CS490R Project: 《Product Review》by Litian</p>
        <ul class="nav-links">
            <li class="links">
                <router-link :to="{name:'Home'}" >Home</router-link>
            </li>
            <li class="links">
                <router-link :to="{name:'About'}" >About</router-link>
            </li>
            <li v-if="!$store.getters.loggedIn" class="links" >
                <router-link 
                :to="{name:'Signup'}" 
                
                >Signup</router-link>
            </li>

            <!--signup and login link only shows when we are not logged in, 
            meaning token in store is null -->
            <li v-if="!$store.getters.loggedIn" class="links" >
                <router-link 
                :to="{name:'Login'}" 
                
                >Login</router-link>
            </li>

            <li v-if="$store.getters.loggedIn" class="links" >
                <router-link 
                :to="{name:'Products'}" 
                
                >Products</router-link>
            </li>

<!-- we make a logout link here, only show when we are logged in -->
            <li v-if="$store.getters.loggedIn" @click="logout()" class="links">Logout</li>
        
           
        </ul>
    </nav>

   
</template>

<script>
export default {
    methods: {
        //this method will be called when we clike on logout link, this actual action is in store.js 
        logout() {
            this.$store.dispatch("logout");
            //this.$router.push("/");
        }
    },
}
</script>

<style scoped>
#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  border: 1px solid gray;
  z-index: 1;
}

#nav ul {
    list-style-type: none;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: blueviolet;
}

.nav-links {
    display: flex;
    
    background-color:white;

    display: inline-flex;

    font-weight: bold;
    
}

.links:hover {
    text-decoration: underline;
}

.links {
    padding-right: 20px;
    list-style: none;
    font-weight: bold;
}



.logo {
    font-size: 20px;
    color: blue;
    font-weight: bold;
}

</style>