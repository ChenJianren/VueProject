import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from "./beforeEach";
import Login from "@/components/login/Login";
import List from "../components/store/goods/List.vue";
import Detail from "@/components/store/goods/Detail.vue";
import Shopcart from "@/components/store/shopcart/Shopcart.vue";
import Commit from "@/components/store/order/Commit.vue";
import Pay from "@/components/store/order/Pay.vue";
import Store from "@/components/store/Store.vue";
Vue.use(Router)
let router = new Router({
  routes: [
    {
      name: 'index', path: '/', component: Store, children: [
        { name: 'list', path: '/', component: List },
        { name: 'detail', path: 'detail/:id', component: Detail },
        { name: 'shopcart', path: 'shopcart', component: Shopcart },
        { name: 'commit', path: 'order/commit/:ids', component: Commit },
        { name: 'pay', path: 'order/pay/:id', component: Pay }
      ]
    },
    { name: 'login', path: '/login', component: Login },
  ]
})
router.beforeEach(beforeEach);
export default router;