// 导入第三方包
import Vue from 'vue'
import Vuex from "vuex"
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
// 导入和vue无关的第三方包
import "normalize.css"
import "@/less/index.less"
import "@/css/style.css"
import "@/lib/css/magnifier.css";
import axios from "axios"
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://111.230.36.92:8888"
Vue.prototype.$http = axios
// 导入自己写的包
import App from './App.vue'
import api from "./js/api-config.js"
Vue.prototype.$api = api
import router from './router'
import MyFilter from "./filter";
import store from "./store";
//启动
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(MyFilter);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: new Vuex.Store(store)
})