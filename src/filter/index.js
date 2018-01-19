import date from "./date.js";
export default {
  install(vue) {
    vue.filter('date', date);
  }
}