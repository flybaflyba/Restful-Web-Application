<template>
    <nav class="nav">
        <p class="logo">CS490R Litian Product Review</p>
        <ul class="nav-links">
            <li>
                <router-link :to="{name:'Home'}" class="links">Home</router-link>
            </li>
            <li>
                <router-link :to="{name:'About'}" class="links">About</router-link>
            </li>
            <li>
                <router-link :to="{name:'Signup'}" class="links">Signup</router-link>
            </li>
            <li>
                <router-link :to="{name:'Login'}" class="links">Login</router-link>
            </li>
        </ul>
    </nav>
</template>

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
    
}

.links:hover {
    text-decoration: underline;
}

.links {
    padding-right: 20px;
    list-style: none;
}



.logo {
    font-size: 20px;
    color: blue;
    font-weight: bold;
}

</style>