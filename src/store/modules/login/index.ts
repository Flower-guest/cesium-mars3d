import { defineStore } from "pinia";
// import { loginApi } from "@/service/api";
import LocalCache from "@/utils/cache";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
    };
  },
  getters: {},
  actions: {
    async login({ username, password,remember }) {
      // const res:any = await loginApi({ username, password });
      // this.token = res.token;
      this.token = "ssadadsadasasda"
      LocalCache.setEncryption("userInfo", {
        username,
        password,
        remember,
        info: this.token,
      });
    },
  },
});
