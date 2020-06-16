

//Create store file, so that we can use things in this file anywhere else
//

import Vue from "vue";
import Vuex from "vuex";
import AuthService from "@/services/auth";

const token = localStorage.getItem("jwt_token"); 

const initialState =
    token && token != ""
        ? { loggedIn: true, token: token }
        : { loggedIn: false, token: null };

Vue.use(Vuex)

//we store our token in this file so that we know if we are signed in ou not 
export const store = new Vuex.Store({
         state: initialState,
         actions: {
           //this is a method we can call in out login vue, so taht we save token into this file while login 
           login({ commit }, user) {
             return AuthService.login(user)
               .then((token) => {
                 //make api request
                 console.log("Got token from service: " + token);
                 //save token returned
                 localStorage.setItem("jwt_token", token);
                 commit("login", token);
                 return Promise.resolve();
               })
               .catch((err) => {
                 console.log("Login failed");
                 console.log(err);
                 return Promise.reject(err);
               });
           },
           //this logout action is for use of logout link in navation, this weill erase the token from local stotrage, then the brower knows we are not logged in
           logout({ commit }) {
             localStorage.removeItem("jwt_token");
             commit("logout");
           },
         },
         mutations: {
           login(state, token) {
             state.loggedIn = true;
             state.token = token;
           },
           logout(state) {
             state.loggedIn = false;
             state.token = null;
           },
         },
         //getters we returns these info, so that we can use them in other parts of the app
         getters: {
           loggedIn: (state) => state.loggedIn,
           token: (state) => state.token,
         },
       });

