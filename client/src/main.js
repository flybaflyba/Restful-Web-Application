import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from './store/store';

Vue.config.productionTip = false;

new Vue({
  router,
  //we import and include store here so that we can access to it in other parts of our app 
  store,
  render: h => h(App)
}).$mount("#app");
