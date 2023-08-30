import * as Cesium from "mars3d-cesium";
import * as mars3d from "mars3d";
import CesiumNavigation from "cesium-navigation-es6";
import Measure from "./measure"; //划线等功能类
import AddScene from "./AddSceneData"; //添加线面单体化等数据类
import MapEvent from "./MapEvent"; //地图事件类
import Mars3dAdd from "./Mars3dAddScene"; //添加场景类
import DrawUnit from "./Draw"; //绘制
import DivGraphic from "./DivGraphic"; //绘制div Billboard
import Shp2JsonLayer from "./Shp2JsonLayer"; //shp转geojson
import {
  map3d,
  dJSON,
  // dTiles,
  dLines,
  billboard,
  billboardArr,
  CESIUM_ID,
} from "./config/cesiumConfig";
import "../../assets/css/cesiumNavigation.css";

class CesiumInit {
  viewer: any;
  measure: any; //划线、测量等功能类
  addScene: any; //添加Billboard、线、面功能类
  mapEvent: any; //地图事件类
  mars3dAdd: any; //mars3d功能
  map3d: any;
  drawUnit: any;
  previousTime: any;
  divGraphic: any;
  constructor(option: any = null) {
    this.viewer = null;
    this.initMap(option);
    this.initDataEvent();
  }
  initMap(option) {
    window.CESIUM_BASE_URL = "node_modules/cesium/Build/CesiumUnminified/";
    if (option) map3d.control["compass"] = option.compass;
    this.map3d = new mars3d.Map(CESIUM_ID, map3d);
    this.map3d.unbindContextMenu(); //解除绑定的右键菜单
    mars3d.layer["Shp2JsonLayer"] = Shp2JsonLayer;
  }
  initDataEvent() {
    // 初始化功能
    const viewer = this.map3d;
    this.addScene = new AddScene(viewer);
    // 初始化测量工具
    this.measure = new Measure(viewer);
    // 初始化地图事件
    this.mapEvent = new MapEvent(viewer);
    // 初始化mars3d事件
    this.mars3dAdd = new Mars3dAdd(viewer);
    // 初始化划线画面
    this.drawUnit = new DrawUnit(viewer);
    // 初始化DIV数据图层
    this.divGraphic = new DivGraphic(viewer);
    // 将设置好的viewer赋值
    this.viewer = viewer;
    // 初始化罗盘等工具
    this.initCesiumNavigation(viewer);
    // 地球自转
    this.rotation(viewer);
    // 加载3DTileset模型
    // for (let i = 0; i < dTiles.length; i++) {
    //   this.mars3dAdd.addCesium3DTileSet(dTiles[i]);
    // }
    for (let i = 0; i < billboard.length; i++) {
      const { lng, lat, height, type, name } = billboard[i];
      this.divGraphic.addGradientPnl({
        position: [lng, lat, height],
        img: `mk_${type}.png`,
        text: name,
        diFar: 20000,
        attr: billboard[i],
      });
    }
    for (let i = 0; i < billboardArr.length; i++) {
      // 初始化加载标点
      this.addBillboard(billboardArr[i].url);
    }
  }
  // 初始化罗盘等工具
  initCesiumNavigation(viewer: any) {
    const options: any = {};
    // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
    options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50); // new Cesium.Rectangle.fromDegrees(113.8980, 22.4899, 113.9686, 22.5438)
    // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    options.enableCompass = true;
    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    options.enableZoomControls = true;
    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    options.enableDistanceLegend = true;
    // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
    options.enableCompassOuterRing = true;
    new CesiumNavigation(viewer, options);
  }
  addBillboard(res) {
    const type = res?.layer?.type ?? null;
    switch (type) {
      case "zldt":
        for (let i = 0; i < res.features.length; i++) {
          const { properties } = res.features[i];
          const { lng, lat, height, name, type } = properties;
          this.mars3dAdd.addBillboard({
            position: [lng, lat, height],
            img: `mk_${type}.png`,
            di: true,
            diFar: 20000,
            attr: properties,
            label: {
              text: name,
              fs: 16,
              color: "#CCF7FF",
              outline: true,
              outCol: "#707070",
              outWid: 1,
              bg: true,
              bgc: "#041822",
              bgo: 0.7,
              bgp: [16, 4],
              di: true,
              diFar: 20000,
              pY: -50,
            },
          });
        }
        break;
      default:
        for (let i = 0; i < res.features.length; i++) {
          const { properties } = res.features[i];
          const { lng, lat, height, name } = properties;
          this.divGraphic.addNoVRDiv({
            position: [lng, lat, height],
            img: `test.png`,
            text: name,
            diFar: 20000,
            attr: properties,
            vr: properties?.vr ?? null,
          });
        }
        break;
    }
  }
  // 地球自转
  rotation(viewer: any) {
    const that = this;
    const cb = function () {
      const step = Math.PI * 0.001 * 5;
      viewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, step);
    };
    viewer.clock.onTick.addEventListener(cb);

    setTimeout(() => {
      viewer.clock.onTick.removeEventListener(cb);
      that.stopRotation();
    }, 1000);
  }
  // 停止自转执行函数
  stopRotation() {
    const that = this;
    // 添加莲花山边界线
    setTimeout(() => {
      that.mars3dAdd.addGeoJsonLayer({
        data: dJSON[0].url,
        outCol: Cesium.Color.GAINSBORO,
        opc: 0.3,
        color: "rgb(0,0,0)",
        name: "LHSBJX",
        mask: true,
      });
    }, 6000);

    // 加载线
    for (let i = 0; i < dLines.length; i++) {
      this.addLine(dLines[i].url);
    }
    // 加载图层
    this.mars3dAdd.addXyzLayer({
      url:
        import.meta.env.VITE_BASE_URL +
        "/DOM_LHS_PT_CS_WGS1984_Service/{z}/{x}/{y}.png", // 图层url
      layer: "lhs", // 图层名
    });
    this.addScene.changeViews("LHS", 8);
  }
  addLine(res) {
    for (let i = 0; i < res.features.length; i++) {
      const { properties, geometry } = res.features[i];
      if (geometry.type !== "Polygon") {
        const option = {
          positions: geometry.coordinates,
          style: properties.style,
          name: "LHSBJX",
        };
        this.mars3dAdd.addPolylinePrimitive(option);
      } else {
        const option = {
          positions: geometry.coordinates,
          style: properties.style,
          name: "LHSBJX",
        };
        this.mars3dAdd.addPolygonPrimitive(option);
      }
    }
  }
  addPoint(res) {
    for (let i = 0; i < res.features.length; i++) {
      const { properties, geometry } = res.features[i];
      const option = {
        positions: geometry.coordinates,
        style: properties.style,
      };
      this.mars3dAdd.addPoint(option);
    }
  }
}

export default CesiumInit;
