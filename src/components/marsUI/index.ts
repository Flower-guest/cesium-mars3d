/**
 * 统一导出公共组件, 按需初始化ant-design-vue
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2022-01-01
 */
import { App } from "vue";
import MarsSelect from "./mars-select/index.vue";
import MarsTextarea from "./mars-textarea/index.vue";
import MarsInputNumber from "./mars-input-number/index.vue";
import MarsColorPicker from "./mars-color-picker/index.vue";
import MarsSwitch from "./mars-switch/index.vue";
import MarsSlider from "./mars-slider/index.vue";

import "./index.less";
import "./function.less";

const components = [
  MarsSelect,
  MarsInputNumber,
  MarsColorPicker,
  MarsTextarea,
  MarsSwitch,
  MarsSlider,
];

let marsUIConfig: Record<string, any>;

export const getConfig = () => {
  return marsUIConfig;
};

export default function (app: App, config: Record<string, any> = {}): App {
  marsUIConfig = config;

  components.forEach((comp) => {
    app.component(comp.name, comp);
  });

  return app;
}
