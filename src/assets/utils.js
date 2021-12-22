const utils = {
  getCallNumberFormat: (str) => {
    let regex = /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/;
    let numberFormat = str.replace(regex, "$1-$2-$3").replace("--", "-");
    return numberFormat;
  },

  getOnlyNumber: (str) => {
    var regex = /^([0-9]*)$/;

    return regex.test(str);
  },

  handlerLineBreak: (str) => {
    return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
  },
  isNull: (value) => {
    return (
      value === null ||
      value === undefined ||
      value === "null" ||
      value === "undefined" ||
      value === ""
    );
  },
  isNotNull: function (value) {
    return !this.isNull(value);
  },
};

export default utils;
