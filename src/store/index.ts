import { createPinia } from "pinia";
import { useAxiosSpinStore } from "./modules/axiosSpin";
import { useTopTypeStore } from "./modules/topClickType";
import {useWidGet}from "./modules/widget";
// pinia持久化
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();

pinia.use(createPersistedState());

export { useAxiosSpinStore, useTopTypeStore,useWidGet };

export default pinia;
