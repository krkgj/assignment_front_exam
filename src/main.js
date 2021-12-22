import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import utils from "@/assets/utils";

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
