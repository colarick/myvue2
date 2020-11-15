import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [{
    path: "/",
    name: 'login',
    component: () => import("../pages/login")
  }, {
    path: "/home",
    component: () => import('../pages/home'),
    children: [
      {
        path: 'menu-1',
        name: 'menu-1',
        component: () => import("../pages/menu1")
      }
    ]
  }]
})