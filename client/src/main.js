import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify'
import Vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
    loggedin: false,
    token: -1
  },
  mutations: {
    setLogin(state, logo){
      state.loggedin = logo;
    },
    setToken(state, token){
      state.token = token;
    },
    setOwnerId(state, ownerId){
      state.ownerId = ownerId;
    },
    setUsername(state, username){
      state.username = username;
    }
  },
  getters: {
    getLogin(state){
      return state.loggedin;
    },
    getToken(state){
      return state.token;
    },
    getOwnerId(state){
      return state.ownerId;
    },
    getUsername(state){
      return state.username;
    }

  }
})
new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount("#app");
