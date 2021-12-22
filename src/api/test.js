import axios from "@/api/index";

const url = "/jwt/test";

const test2 = async (url) => {
  const res = await axios.get(url);
  console.log(res);
  console.log(document.cookie);
  return res;
};

const test = {
  testFunction: () => {
    test2(url);
  },
};

export default test;
