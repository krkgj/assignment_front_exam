import VueCookies from "vue-cookies";
// import logout from "@/api/service/login/logout";
// import axios from "@/api/index";

const makeRequestingHeader = (token) => {
  return `Bearer ${token}`;
};

function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      console.log(config);
      if (VueCookies.get("accessToken") !== null) {
        config.headers.Authorization = makeRequestingHeader(
          VueCookies.get("accessToken")
        );
      } else if (VueCookies.get("refreshToken") !== null) {
        config.headers.Authorization = makeRequestingHeader(
          VueCookies.get("refreshToken")
        );
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      console.log(error);
      // logout.removeUserInfoFromCookieAndState();
      // VueCookies.remove("accessToken");
      // let result = await axios.post("/login/refreshToken", {
      //   refreshToken: VueCookies.get("refreshToken"),
      // });
      // console.log(result);
      // if (result.data.code === "200") {
      //   VueCookies.set("accessToken", result.data.accessToken);
      //   // axios.request();
      // }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default setInterceptors;
