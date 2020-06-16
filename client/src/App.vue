<template>
  <div id="app">
    <div id="nav">
     
     <TheNavigation />


    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation'
export default {
  components: {
    TheNavigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.input {
  border: 1px solid green;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  width: 100%;
}

.lable {
    font-size: 15px;
    display: flex;
    text-align: center;
}

.button {
  color: blueviolet;
}

</style>
