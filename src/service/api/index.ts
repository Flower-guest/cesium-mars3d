import { jsonRequest } from "..";
import axios from "axios";

enum URL {
  Build = "/data/gis/build.json",
}

// 获取天气数据
export const getWeather = () => {
  return axios
    .get(
      "https://www.yiketianqi.com/free/day?appid=18846723&appsecret=luwcW4Xt&unescape=1&city=长沙"
    )
    .then((res) => {
      return res.data;
    });
};
// 获取建筑面
export const getBuild = () => {
  return jsonRequest.get({
    url: URL.Build,
  });
};
