import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store"

import App from "./App.vue";

Vue.use(ElementUI);

import './permission'

Vue.config.productionTip = process.env.NODE_ENV === "production";
// console.log(process.env.VUE_APP_BASE_API);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
