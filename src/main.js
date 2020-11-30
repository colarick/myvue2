import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router"
Vue.config.productionTip = false
//maincommit 1
// main commit 2
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
})
//test rebase
//test rebasemain
