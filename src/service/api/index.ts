import { jsonRequest } from "..";
import { ComData } from "./type";

import axios from "axios";

const encryptedData = "2c3ee9e12d6f0c3ed413b79f4fc3f1c9";

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
// 获取单个坐标点的信息
export const loginApi = (id) => {
  return jsonRequest.get({
    url: `?IDIP=${185}&encryptedData=${encryptedData}&id=${id}`,
  });
};
// 获取村庄数据
export const getRuralInfo = () => {
  return jsonRequest.get<ComData>({
    url: `?IDIP=${183}&encryptedData=${encryptedData}`,
  });
};
// 获取地图坐标分类
export const getMapMarkerSort = () => {
  return jsonRequest.get<ComData>({
    url: `?IDIP=${181}&encryptedData=${encryptedData}`,
  });
};
// 获取分类坐标 category:分类id
export const getMapSortMarkerData = (id) => {
  return jsonRequest.get<ComData>({
    url: `?IDIP=${182}&encryptedData=${encryptedData}&category=${id}`,
  });
};
// 获取单个坐标点的信息
export const getMarkerInfo = (id) => {
  return jsonRequest.get<ComData>({
    url: `?IDIP=${185}&encryptedData=${encryptedData}&id=${id}`,
  });
};
