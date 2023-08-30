import * as mars3d from "mars3d";
import * as Cesium from "mars3d-cesium";
import { ElLoading } from "element-plus";

export default class DivGraphic {
  map3d: any;
  graphicLayer: any;
  loading: any;

  constructor(map3d) {
    this.map3d = map3d;
    this.graphicLayer = new mars3d.layer.GraphicLayer();
    this.map3d.addLayer(this.graphicLayer);
    this.graphicLayer.on(mars3d.EventType.click, function (event) {
      console.log("监听layer，单击了矢量对象", event);
    });
  }
  //带下线的div图层
  addGradientPnl(option) {
    const imgUrl = new URL(`../../assets/img/${option.img}`, import.meta.url)
      .href;
    const graphic = new mars3d.graphic.DivGraphic({
      position: option.position,
      style: {
        html: ` <div class="mars3d-camera-content">
                      <img src="${imgUrl}" />
                    <span style=" font-size: 16px;">${option.text}</span>
                      </div>
                    <div class="mars3d-camera-line" ></div>
                    <div class="mars3d-camera-point"></div>`,
        offsetX: -66,
        offsetY: 4,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          option?.diFar ?? Number.MAX_VALUE
        ), // 按视距距离显示
      },
      show: option?.show ?? false,
      attr: option?.attr ?? null,
    });
    this.graphicLayer.addGraphic(graphic);
  }
  // 包图片的div
  addNoVRDiv(option) {
    const imgUrl = new URL(`../../assets/img/${option.img}`, import.meta.url)
      .href;
    const qjUrl = new URL(`../../assets/img/icon-qjdw.png`, import.meta.url)
      .href;
    const graphic = new mars3d.graphic.DivGraphic({
      position: option.position,
      style: {
        html: ` <div class="marsNoVRDiv">
      <div class="label">${option.text}</div>
      <div class="box">
              <div>
                <img src="${imgUrl}" />
                <img ${
                  option.vr ? 'class="qj"' : 'class="hidden qj"'
                }  src="${qjUrl}" />
              </div>
          </div></div>`,
        // offsetY: -60,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        clampToGround: true,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          option?.diFar ?? Number.MAX_VALUE
        ), // 按视距距离显示
      },
      show: option?.show ?? false,
      attr: option?.attr ?? null,
    });
    this.graphicLayer.addGraphic(graphic);
  }
  // 显示与隐藏billboard
  showDivGraphic(val: any = null, billArr: any = null) {
    this.loading = ElLoading.service({
      lock: true,
      text: "正在加载中....",
      background: "rgba(0, 0, 0, 0.5)",
    });
    const billboardArr = this.graphicLayer.graphics;
    billboardArr.forEach((entity) => {
      const type = entity.attr.type;
      if (val == "all" && billArr) {
        billArr.forEach((i) => {
          entity.show =
            i.menuType == type && i.eventType == "marker" ? true : entity.show;
        });
      } else if (billArr?.length > 0) {
        const arr: any = [];
        billArr.filter((i) => {
          if (i == type) {
            arr.push(entity);
          }
          entity.show = false;
        });
        arr.forEach((i) => {
          i.show = true;
        });
      } else if (val) {
        entity.show = type == val ? true : false;
      } else {
        entity.show = false;
      }
    });
    this.loading?.close();
  }
}
