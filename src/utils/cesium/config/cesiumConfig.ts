import LocalCache from "@/utils/cache";
// import HNSAreas from "@/assets/json/HNSAreas.json";
// import CSAreas from "@/assets/json/CSAreas.json";
// import CSXZAreas from "@/assets/json/CSXZAreas.json";
// import YLQSQAreas from "@/assets/json/YLQSQAreas.json";
import LHSAreas from "@/assets/json/LHSAreas.json";
// import LHSCZKFBJXAreas from "@/assets/json/LHSCZKFBJXAreas.json";
// import LHSSTBHHXAreas from "@/assets/json/LHSSTBHHXAreas.json";
// import LHSTDLYGHAreas from "@/assets/json/LHSTDLYGHAreas.json";
// import LHSYJJBNTBHX from "@/assets/json/LHSYJJBNTBHX.json";
import LHSJTZSLine from "@/assets/json/LHSJTZSLine.json";
import point from "@/assets/json/point.json";
import zldtMarker from "@/assets/json/zldtMarker.json";
import zsxmMarker from "@/assets/json/zsxmMarker.json";
import zszcMarker from "@/assets/json/zszcMarker.json";
import ghxmMarker from "@/assets/json/ghxmMarker.json";
import qtzcMarker from "@/assets/json/qtzcMarker.json";
import fwzcMarker from "@/assets/json/fwzcMarker.json";
import { markerArr } from "./markerConfig";
// 加载cesium的domId
export const CESIUM_ID = "cesiumContainer";

export const map3d = {
  scene: {
    center: { lat: 38.602075, lng: 160, alt: 37036414 },
    clock: { multiplier: 200 },
    shadows: false,
    removeDblClick: true,
    sceneMode: 3,
    showSun: true,
    showMoon: true,
    showSkyBox: true,
    showSkyAtmosphere: true,
    fog: true,
    fxaa: true,
    globe: {
      depthTestAgainstTerrain: true,
      baseColor: "#546a53",
      showGroundAtmosphere: true,
      enableLighting: false,
    },
    cameraController: {
      zoomFactor: 3,
      minimumZoomDistance: 1,
      maximumZoomDistance: 5e7,
      enableRotate: true,
      enableTranslate: true,
      enableTilt: true,
      enableZoom: true,
      enableCollisionDetection: true,
    },
  },
  control: {
    baseLayerPicker: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    mouseDownView: false,
  },
  terrain: { url: "http://data.mars3d.cn/terrain", show: false },
  basemaps: [
    {
      id: 2021,
      name: "谷歌影像",
      icon: "/img/basemaps/google_img.png",
      type: "google",
      layer: "img_d",
      show: true,
      zIndex: 1,
    },
  ],
  layers: [
    {
      layer: "ibo",
      mapSplit: false,
      name: "行政区划界线",
      show: true,
      type: "tdt",
      zIndex: 2,
    },
  ],
};

// 加载3dtitles配置
export const dTilesOption = {
  skipLevelOfDetail: true, //优化选项。确定是否应在遍历期间应用详细级别跳过(默认false)
  baseScreenSpaceError: 1024, // --- When skipLevelOfDetailis true，在跳过详细级别之前必须达到的屏幕空间错误(默认1024)
  skipScreenSpaceErrorFactor: 16, // --- 何时skipLevelOfDetail是true，定义要跳过的最小屏幕空间错误的乘数。与 一起使用skipLevels来确定要加载哪些图块(默认16)
  skipLevels: 1, // --- WhenskipLevelOfDetail是true一个常量，定义了加载图块时要跳过的最小级别数。为 0 时，不跳过任何级别。与 一起使用skipScreenSpaceErrorFactor来确定要加载哪些图块。(默认1)
  immediatelyLoadDesiredLevelOfDetail: false, // --- 当skipLevelOfDetail是时true，只会下载满足最大屏幕空间错误的图块。忽略跳过因素，只加载所需的图块(默认false)
  loadSiblings: true, // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋
  cullWithChildrenBounds: true, // ---优化选项。是否使用子边界体积的并集来剔除瓦片（默认true）
  cullRequestsWhileMoving: true, // ---优化选项。不要请求由于相机移动而在返回时可能未使用的图块。这种优化只适用于静止的瓦片集(默认true)
  cullRequestsWhileMovingMultiplier: 10, // 值越小能够更快的剔除---优化选项。移动时用于剔除请求的乘数。较大的是更积极的剔除，较小的较不积极的剔除(默认60)原10
  preloadWhenHidden: true, // ---tileset.show时 预加载瓷砖false。加载图块，就好像图块集可见但不渲染它们(默认false)
  preloadFlightDestinations: true, // ---优化选项。在相机飞行时在相机的飞行目的地预加载图块(默认true)
  preferLeaves: true, // ---优化选项。最好先装载叶子(默认false)
  dynamicScreenSpaceErrorFactor: 1, // 不知道起了什么作用没，反正放着吧先 --- 用于增加计算的动态屏幕空间误差的因素(默认4.0)
  foveatedScreenSpaceError: true, // --- 优化选项。通过暂时提高屏幕边缘周围图块的屏幕空间错误，优先加载屏幕中心的图块。一旦Cesium3DTileset#foveatedConeSize加载确定的屏幕中心的所有图块，屏幕空间错误就会恢复正常。(默认true)
  foveatedConeSize: 0.1, // --- 优化选项。当Cesium3DTileset#foveatedScreenSpaceError为 true 时使用来控制决定延迟哪些图块的锥体大小。立即加载此圆锥内的瓷砖。圆锥外的瓷砖可能会根据它们在圆锥外的距离及其屏幕空间误差而延迟。这是由Cesium3DTileset#foveatedInterpolationCallback和控制的Cesium3DTileset#foveatedMinimumScreenSpaceErrorRelaxation。将此设置为 0.0 意味着圆锥将是由相机位置及其视图方向形成的线。将此设置为 1.0 意味着锥体包含相机的整个视野,禁用效果(默认0.1)
  foveatedMinimumScreenSpaceErrorRelaxation: 0.0, // --- 优化选项。当Cesium3DTileset#foveatedScreenSpaceError为 true 时使用以控制中央凹锥之外的图块的起始屏幕空间误差松弛。屏幕空间错误将从 tileset 值开始Cesium3DTileset#maximumScreenSpaceError根据提供的Cesium3DTileset#foveatedInterpolationCallback.(默认0.0)
  progressiveResolutionHeightFraction: 0.5, // 数值偏于0能够让初始加载变得模糊
  maximumMemoryUsage: 512, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验，分配的越多倾斜的逐帧加载效果越小
  dynamicScreenSpaceErrorDensity: 0.5, // 数值加大，能让周边加载变快
  dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
};
/**
 * @description: 加载区划数据json
 * @param {*} viewName:视角名称（用于切换视角）
 * @param {*} isMX:是否模型
 * @param {*} height:marker点高度
 * @param {*} pageType:头部切换页面类型 jj:乡村简介 fz:乡村发展 zl:乡村治理
 * @param {*} eventType:事件类型  null|moveHighlight:是否鼠标移入高亮|showTable：是否点击显示表单
 * @param {*} dataType:面数据类型 null|division:区划数据|build:建筑物数据
 */
export const dJSON = [
  // {
  //   url: HNSAreas,
  //   name: "湖南省区划",
  //   viewName: "HNS",
  //   isMX: false,
  //   height: 800,
  //   pageType: "jj",
  //   eventType: "moveHighlight",
  //   dataType: "division",
  // },
  // {
  //   url: CSAreas,
  //   name: "长沙区划",
  //   viewName: "CS",
  //   isMX: false,
  //   height: 100,
  //   pageType: "sp",
  //   eventType: "moveHighlight",
  //   dataType: "division",
  // },
  // {
  //   url: CSXZAreas,
  //   name: "岳麓区",
  //   viewName: "YLQ",
  //   isMX: false,
  //   height: 100,
  //   pageType: "sp",
  //   eventType: "moveHighlight",
  //   dataType: "division",
  // },
  // {
  //   url: YLQSQAreas,
  //   height: 100,
  //   name: "坪塘街道",
  //   viewName: "PTJD",
  //   isMX: false,
  //   pageType: "sp",
  //   eventType: "",
  //   dataType: "",
  // },
  {
    url: LHSAreas,
    height: 100,
    name: "莲花山",
    viewName: "LHS",
    isMX: false,
    pageType: "sp",
    eventType: "",
    dataType: "",
  },
  // {
  //   name: "高觉田园新村民计划",
  //   viewName: "GJT",
  //   isMX: false,
  //   height: 50,
  //   pageType: "zs",
  //   eventType: "",
  //   dataType: "point",
  //   billboardType: 7,
  // },
  // {
  //   url: LHSTDLYGHAreas,
  //   name: "土地利用规划",
  //   viewName: "LHS",
  //   isMX: false,
  //   height: 50,
  //   pageType: "zs",
  //   eventType: "",
  //   dataType: "",
  //   lineColor: "rgba(0,0,0,.6)",
  //   lineWidth: 1,
  //   polygonColor: "manyColor",
  // },
  // {
  //   url: LHSCZKFBJXAreas,
  //   name: "城镇开发边界",
  //   viewName: "LHS",
  //   isMX: false,
  //   height: 50,
  //   pageType: "zs",
  //   eventType: "",
  //   dataType: "",
  //   lineColor: "rgba(0,0,0,.6)",
  //   lineWidth: 1,
  //   polygonColor: "rgba(192,233,247.6)",
  // },
  // {
  //   url: LHSSTBHHXAreas,
  //   name: "生态保护线",
  //   viewName: "LHS",
  //   isMX: false,
  //   height: 50,
  //   pageType: "zs",
  //   eventType: "",
  //   dataType: "",
  //   lineColor: "rgba(0,0,0,.6)",
  //   lineWidth: 1,
  //   polygonColor: "rgba(151,255,99,.6)",
  // },
  // {
  //   url: LHSYJJBNTBHX,
  //   name: "基本农田保护线",
  //   viewName: "LHS",
  //   isMX: false,
  //   height: 50,
  //   pageType: "zs",
  //   eventType: "",
  //   dataType: "",
  //   lineColor: "rgba(0,0,0,.6)",
  //   lineWidth: 1,
  //   polygonColor: "rgba(240,192,99.6)",
  // },
];
// 加载模型数据
// export const dTiles = [
//   {
//     url: import.meta.env.VITE_BASE_URL + "/3dCock/M_S_LeWoJu/tileset.json",
//     heightOffset: -2,
//     max: 256,
//     name: "乐沃居",
//     viewName: "LeWoJu",
//     isMX: true,
//   },
//   {
//     url: import.meta.env.VITE_BASE_URL + "/3dCock/M_S_ZongHeTi/tileset.json",
//     heightOffset: 6,
//     max: 100,
//     name: "综合体",
//     viewName: "LeWoJu",
//     isChangePos: true,
//     Pos: {
//       lng: 113.01805013225533,
//       lat: 28.079512489864833,
//       alt: 55,
//       sca: 0.2,
//     },
//     isMX: true,
//   },
// ];
// 加载线数据
export const dLines = [
  {
    url: LHSJTZSLine,
  },
];
// 加载点数据
export const dPoint = [
  {
    url: point,
  },
];
// 新增点位的回显与默认marker点位配置
const markerInfo = LocalCache.getCache("markerInfo") || [];
export const billboard = [...markerInfo, ...markerArr];

// 新增点位的回显与默认marker点位配置
export const billboardArr = [
  {
    url: zldtMarker,
  },
  {
    url: zsxmMarker,
  },
  {
    url: zszcMarker,
  },
  {
    url: ghxmMarker,
  },
  {
    url: qtzcMarker,
  },
  {
    url: fwzcMarker,
  },
];
