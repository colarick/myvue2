import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router"
Vue.config.productionTip = false
//test a
// hhhhh
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
})

