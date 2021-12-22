import VueCookies from "vue-cookies";
import userStore from "@/store/userStore";

const getUserInfoFromCookie = () => {
  const userInfo = {
    userName: VueCookies.get("userName"),
    accessToken: VueCookies.get("accessToken"),
  };

  return userInfo;
};

const removeUserCookie = () => {
  VueCookies.remove("userName");
  VueCookies.remove("accessToken");
};

const removeUserStates = () => {
  userStore.state.userName = "";
  userStore.state.accessToken = "";
  userStore.state.isAuthenticated = false;
};

const logout = {
  removeUserInfoFromCookieAndState: () => {
    const userInfo = getUserInfoFromCookie();

    if (userInfo.accessToken !== null || userInfo.userName !== null) {
      removeUserCookie();
      removeUserStates();
    }
  },
  removeUserCookie,
  getUserInfoFromCookie,
};

export default logout;
