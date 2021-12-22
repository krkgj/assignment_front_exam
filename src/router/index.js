import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/LoginView";
import VacationView from "@/views/VacationView";
import utils from "@/assets/utils";
import VueCookies from "vue-cookies";

Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    alias: ["/"],
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/vacation",
    name: "VacationView",
    component: VacationView,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});
router.beforeEach((to, from, next) => {
  const accessToken = VueCookies.get("accessToken");
  // Cookie에 userName과 token이 저장되어있을 때,
  if (utils.isNull(accessToken) && to.path !== "/") {
    alert("로그인이 필요합니다.");
    next("/");
  } else next();
});
export default router;
