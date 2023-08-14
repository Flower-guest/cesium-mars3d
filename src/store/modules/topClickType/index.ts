import { defineStore } from "pinia";

export const useTopTypeStore = defineStore("topType", {
  state: () => {
    return {
      TopClickType: "sp",
    };
  },
  getters: {},
  actions: {
    setTopClickType(topClickType) {
      this.TopClickType = topClickType;
    },
  },
});
