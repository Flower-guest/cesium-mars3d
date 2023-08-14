/*
 * @Author: cxj 1481240653@qq.com
 * @Date: 2023-07-21 10:32:40
 * @LastEditors: cxj 1481240653@qq.com
 * @LastEditTime: 2023-08-11 15:28:16
 * @FilePath: \lhs-demo\src\utils\cesium\measure\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as mars3d from "mars3d";
import { useWidGet } from "@/store";

const store = useWidGet();

export default class DrawUnit {
  viewer: any;
  drawLayer: any;
  // drawPolyLayer:any;
  constructor(viewer) {
    this.viewer = viewer;
    this.init();
  }

  init() {
    this.drawLayer = new mars3d.layer.GraphicLayer();
    this.viewer.addLayer(this.drawLayer);
    // this.drawPolyLayer = new mars3d.layer.GraphicLayer();
    // this.viewer.addLayer(this.drawPolyLayer);
    this.bindLayerContextMenu();
  }

  draw(type, callBack) {
    switch (type) {
      // 绘制线
      case "hzx":
        this.startDrawLine(callBack);
        break;
      // 绘制面
      case "hzm":
        this.startDrawPolygon(callBack);
        break;
      // case "bjdx":
      //   this.bindLayerContextMenu();
      //   break;
    }
  }
  // 开始划线
  startDrawLine(callBack) {
    this.drawLayer.startDraw({
      type: "polyline",
      // maxPointNum: 2, //可以限定最大点数，2个点绘制后自动结束
      style: {
        color: "#55ff33",
        width: 3,
        label: {
          font_size: 18,
          color: "#ffffff",
        },
        clampToGround: true,
      },
      success: function () {
        callBack();
      },
    });
  }
  // 开始画面
  startDrawPolygon(callBack) {
    this.drawLayer.startDraw({
      type: "polygon",
      style: {
        color: "#29cf34",
        opacity: 0.5,
        outline: true,
        outlineWidth: 3,
        outlineColor: "#ffffff",
        clampToGround: true,
      },
      success: function () {
        callBack();
      },
    });
  }
  // 右键菜单
  bindLayerContextMenu() {
    const that = this;
    that.drawLayer.bindContextMenu([
      {
        text: "开始编辑对象",
        icon: "fa fa-edit",
        show: function (e) {
          const graphic = e.graphic;
          if (!graphic || !graphic.hasEdit) {
            return false;
          }
          return !graphic.isEditing;
        },
        callback: (e) => {
          const graphic = e.graphic;
          if (!graphic) {
            return false;
          }
          if (graphic) {
            // const option = {
            //   layerName: graphic._layer.name || "",
            //   graphicType: graphic.type,
            //   customType: graphic.options.styleType,
            //   style: graphic.style,
            //   id: graphic.id,
            // };
            store.setCurrentWidget(graphic);
            that.drawLayer.startEditing(graphic);
          }
        },
      },
      {
        text: "停止编辑对象",
        icon: "fa fa-edit",
        show: function (e) {
          const graphic = e.graphic;
          if (!graphic || !graphic.hasEdit) {
            return false;
          }
          return graphic.isEditing;
        },
        callback: (e) => {
          const graphic = e.graphic;
          if (!graphic) {
            return false;
          }
          if (graphic) {
            store.setCurrentWidget("");
            graphic.stopEditing();
          }
        },
      },
      {
        text: "删除对象",
        icon: "fa fa-trash-o",
        show: (event) => {
          const graphic = event.graphic;
          if (!graphic || graphic.isDestroy) {
            return false;
          } else {
            return true;
          }
        },
        callback: (e) => {
          const graphic = e.graphic;
          if (!graphic) {
            return;
          }
          const parent = graphic.parent; // 右击是编辑点时
          that.drawLayer.removeGraphic(graphic);
          if (parent) {
            that.drawLayer.removeGraphic(parent);
          }
          store.setCurrentWidget("");
        },
      },
    ]);
  }
}
