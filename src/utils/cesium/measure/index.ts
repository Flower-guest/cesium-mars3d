/*
 * @Author: cxj 1481240653@qq.com
 * @Date: 2023-07-21 10:32:40
 * @LastEditors: cxj 1481240653@qq.com
 * @LastEditTime: 2023-08-10 17:22:21
 * @FilePath: \lhs-demo\src\utils\cesium\measure\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as mars3d from "mars3d";

export default class MeasureUnit {
  viewer: any;
  measure: any;
  drawLayer: any;
  constructor(viewer) {
    this.viewer = viewer;
    this.init();
  }
  init() {
    this.measure = new mars3d.thing.Measure({
      label: {
        color: "#ffffff",
        font_family: "楷体",
        font_size: 20,
        background: false,
      },
    });
    this.viewer.addThing(this.measure);
    this.drawLayer = new mars3d.layer.GraphicLayer();
    this.viewer.addLayer(this.drawLayer);
  }
  // 水平面积
  measureArea() {
    this.measure.area();
  }
  // 贴地面积
  measureSurfaceeArea() {
    this.measure.areaSurface({
      style: {
        color: "#ffff00",
      },
      splitNum: 10, // step插值分割的个数
      exact: false, // 是否进行精确计算， 传false时是否快速概略计算方式，该方式计算精度较低，但计算速度快，仅能计算在当前视域内坐标的高度
    });
  }
  // 三角测量
  measureTriangleHeight() {
    this.measure.heightTriangle();
  }
  removeAll() {
    this.measure.clear();
  }
  removeDraw() {
    this.drawLayer.remove();
  }
  measureStart(type, callBack) {
    switch (type) {
      // 直线量距三角测量
      case "zxlj":
        this.measureTriangleHeight();
        callBack();
        break;
      // 水平面积
      case "spmj":
        this.measureArea();
        callBack();
        break;
      // 地表面积
      case "dbmj":
        this.measureSurfaceeArea();
        callBack();
        break;
      case "qc":
        this.removeAll();
        callBack();
        break;
    }
  }
}
