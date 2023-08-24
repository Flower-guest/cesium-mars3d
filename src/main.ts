import { createApp } from "vue";
import App from "./App.vue";
import route from "./router";
import pinia from "./store";
import pluginMain from "./plugins";
import MarsUIInstall from "./components/marsUI";

import Vue3Marquee from "vue3-marquee";

import "@/assets/css/divGraphic.css";
import "@/assets/font/font.css";
import "virtual:uno.css";
import "normalize.css/normalize.css";

// import vue3videoPlay from "vue3-video-play"; // 引入组件
// import "vue3-video-play/dist/style.css"; // 引入css

//引入cesium基础库
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
// import * as Cesium from "mars3d-cesium";

//导入mars3d主库
import "mars3d/dist/mars3d.css";
import "mars3d-tdt";
// import * as mars3d from "mars3d";

import "amfe-flexible/index.js";

const app = createApp(App);
pluginMain(app);
MarsUIInstall(app, {
  dialog: {
    position: {
      left: 50,
      bottom: 50,
    },
    warpper: "#mars-main-view",
  },
});

app.use(Vue3Marquee).use(route).use(pinia).mount("#app");
