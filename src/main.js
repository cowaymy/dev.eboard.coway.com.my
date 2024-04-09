import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./style/styles.scss";
import ChartPlugins from "./plugins/ChartPlugins.js";
import router from "@/routes/index";
import store from "@/store/index";

import toasted from "vue-toasted";
import VuePwaInstall from "vue-pwa-install";
import webViewBridge from "./webViewBridge"; // 글로벌 함수가 들어있는 js 파일 import

Vue.use(VuePwaInstall);
Vue.use(toasted);
Vue.use(webViewBridge);

import "./registerServiceWorker";
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  ChartPlugins,
  toasted,
  VuePwaInstall,
  //preset,
  render: (h) => h(App),
}).$mount("#app");
 