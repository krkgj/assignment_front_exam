import axios from "@/api/index";
import userStore from "@/store/userStore";

const SUCESS = "200";
const BAD_CREADENTIALS = "401";
const USER_NOT_FOUND = "404";
const REQUEST_TOKEN_URL = "/jwt/token";
const ERROR_CODES = {
  SUCESS,
  BAD_CREADENTIALS,
  USER_NOT_FOUND,
};
let intervalFunc;

const setCookie = (userName, accessToken) => {
  VueCookies.set("userName", userName);
  VueCookies.set("accessToken", accessToken);
};

const requestToken = async (url, loginData) => {
  const res = await axios.post(url, loginData);
  return res.data;
};

const setUserStates = (userName, accessToken) => {
  userStore.state.userName = userName;
  userStore.state.accessToken = accessToken;
  userStore.state.isAuthenticated = true;
};

const login = {
  generateToken: async (loginData) => {
    let result = await requestToken(REQUEST_TOKEN_URL, loginData);

    let code = result.code;

    let userName = result.userName;
    let accessToken = result.accessToken;

    switch (code) {
      // when success
      case SUCESS:
        setCookie(userName, accessToken);
        setUserStates(userName, accessToken);
        return SUCESS;

      // when user not found
      case USER_NOT_FOUND:
        return USER_NOT_FOUND;

      default:
        break;
    }
  },
};
export const setLogingUserStates = setUserStates;
export const CODES = ERROR_CODES;
export const interval = intervalFunc;
export default login;
