import { createPinia } from "pinia";
import { useUserStore } from "./modules/login";
import { useTopTypeStore } from "./modules/topClickType";
import { useWidGet } from "./modules/widget";
// pinia持久化
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();

pinia.use(createPersistedState());

export { useUserStore, useTopTypeStore, useWidGet };

export default pinia;
