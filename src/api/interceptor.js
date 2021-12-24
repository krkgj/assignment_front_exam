import VueCookies from "vue-cookies";
// import logout from "@/api/service/login/logout";

const makeRequestingHeader = (token) => {
  return `Bearer ${token}`;
};

function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      if (VueCookies.get("accessToken") !== null) {
        config.headers.Authorization = makeRequestingHeader(
          VueCookies.get("accessToken")
        );
        // if(config.data instanceof FormData)
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
    function (error) {
      // logout.removeUserInfoFromCookieAndState();
      return Promise.reject(error);
    }
  );

  return instance;
}

export default setInterceptors;
