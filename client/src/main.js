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
    }
  }
})
new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount("#app");
