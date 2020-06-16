import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from './store/store';


import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

//src/main.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false;

new Vue({
  router,
  //we import and include store here so that we can access to it in other parts of our app 
  store,
  render: h => h(App)
}).$mount("#app");
