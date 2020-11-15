import addstore from "./modules/addstore.js";
import Vuex from "vuex";
import Vue from 'vue'
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    addstore: addstore,
    //getters,全局的
  }
}) 