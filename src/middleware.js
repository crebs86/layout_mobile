import Cookie from "js-cookie";
import api from "./api";

export default {
  auth(to, from, next) {
    const ses_token = Cookie.get("ses_token");
    if (!ses_token || ses_token == "undefined") {
      next("/login");
    }

    try {
      api
        .get("/check")
        .then((r) => {
          console.log("api then App", r.data === 1);
          next();
        })
        .catch(() => {
          console.log(".catch redirect /login");
          Cookie.remove("ses_token");
          next("/login");
          ("");
        });
    } catch (e) {
      console.log("catch redirect /login");
      Cookie.remove("ses_token");
      next("/login");
    }
  },
};
