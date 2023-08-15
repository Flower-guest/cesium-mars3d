import * as Cesium from "mars3d-cesium";
import cameraView from "./config/changeViews";
class AddScene {
  viewer: any;
  // tempCollection: any; //区划面线数据
  billCollection: any; //Billboard数据
  // tempBillCollection: any; //临时的Billboard数据
  // tempPrimitives: any; //线|线特效
  ldCollection: any; //加载单体化的数据集

  constructor(viewer) {
    this.viewer = viewer;
    this.init();
  }
  init() {
    // 区划面线数据
    // this.tempCollection = new Cesium.CustomDataSource("temp");
    // this.viewer.dataSources.add(this.tempCollection);
    // Billboard数据
    this.billCollection = new Cesium.CustomDataSource("bill");
    this.viewer.dataSources.add(this.billCollection);
    // 临时的Billboard数据
    // this.tempBillCollection = new Cesium.CustomDataSource("tempBill");
    // this.viewer.dataSources.add(this.tempBillCollection);
    //线|线特效
    // this.tempPrimitives = new Cesium.PrimitiveCollection();
    // this.tempPrimitives.destroyPrimitives = false; //每次对primitive操作的时候并不销毁它，仅仅将他从集合中删除，它本身还是存在的。
    // this.viewer.scene.primitives.add(this.tempPrimitives);
    //加载单体化的数据集
    this.ldCollection = new Cesium.PrimitiveCollection();
    this.ldCollection.destroyPrimitives = false; //每次对primitive操作的时候并不销毁它，仅仅将他从集合中删除，它本身还是存在的。
    this.viewer.scene.primitives.add(this.ldCollection);
  }
  /**
   * @description: 添加建筑面（单体化）
   * @param {*} buildItem:features的properties值
   * @param {*} buffArray:坐标串
   * @param {*} eventType:事件类型  null|moveHighlight:是否鼠标移入高亮|showTable：是否点击显示表单
   * @param {*} type:面数据类型 qh:区划数据|build:建筑物数据
   */
  loadBuilds(buildItem: any, buffArray: any, eventType: string, type: string) {
    // 创建一个GroundPrimitive（地面图元）的实例 地面图元表示在 Scene 中的地形或3D Tiles上叠加的几何图形。叠加一个面用于3dtiles点击高亮与鼠标滑动高亮
    this.ldCollection.add(
      new Cesium.GroundPrimitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArray(buffArray)
            ),
          }),
          id: {
            type: type,
            properties: buildItem,
            eventType,
          },
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.BLUE.withAlpha(0)
            ),
          },
        }),
        classificationType: Cesium.ClassificationType.BOTH,
      })
    );
  }
  /**
   * @description: 添加marker标与lebel
   * @param {*} height：高度
   * @param {*} url：图片地址
   * @param {*} name：label文案
   * @param {*} color：label背景颜色
   * @param {*} info：marker信息
   */
  addBillboard(
    lng: number,
    lat: number,
    height: number,
    url: string,
    name: string,
    color: string,
    info: any = "",
    show = false,
    imgwidth = 50,
    imgheight = 60
  ) {
    const imgUrl = new URL(`../../assets/img/${url}`, import.meta.url).href;
    const billboardLabel: any = new Cesium.Entity({
      name,
      properties: { info },
      position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
      show,
      billboard: {
        //如果有图片路径就展示marker
        image: imgUrl,
        width: imgwidth,
        height: imgheight,
        eyeOffset: new Cesium.Cartesian3(0, 0, -100),
        scaleByDistance: new Cesium.NearFarScalar(100, 0.6, 2000, 0.6),
        show: url ? true : false,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND, //高度参考
        verticalOrigin:
          info.type == "xz"
            ? Cesium.VerticalOrigin.BOTTOM
            : Cesium.VerticalOrigin.CENTER, //垂直原点
      },
      label: {
        text: name,
        show: true,
        showBackground: true,
        backgroundColor: Cesium.Color.fromCssColorString(color),
        font: "normal 14px Microsoft YaHei UI",
        backgroundPadding: new Cesium.Cartesian2(8, 8),
        scale: 0.9,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直原点
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND, //高度参考
        pixelOffset: new Cesium.Cartesian2(0, -25),
        eyeOffset: new Cesium.Cartesian3(0, 0, -100),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          1800000
        ), // 设置标签的可视范围为0到10000米
      },
    });
    if (info?.showDis) {
      //如果有可视范围属性
      billboardLabel.billboard.distanceDisplayCondition =
        new Cesium.DistanceDisplayCondition(0, info.showDis);
      billboardLabel.label.distanceDisplayCondition =
        new Cesium.DistanceDisplayCondition(0, info.showDis);
    }
    billboardLabel["eventType"] = info?.eventType || null; //给marker添加eventType属性
    //  如果类型为临时marker则添加至临时marker集合里面
    // info?.type == "tempBill"
    //   ? this.tempBillCollection.entities.add(billboardLabel)
    //   : this.billCollection.entities.add(billboardLabel);
    this.billCollection.entities.add(billboardLabel);
  }
  // 添加面状效果
  // addPolygonBuff(buffarry, color) {
  //   //贴地
  //   this.tempCollection.entities.add({
  //     polygon: {
  //       hierarchy: Cesium.Cartesian3.fromDegreesArray(buffarry),
  //       material: Cesium.Color.fromCssColorString(color),
  //       clampToGround: true,
  //     },
  //   });
  // }
  /**
   * 添加线
   * @param {*} pipepos 经纬度串
   * @param {*} width 线宽度
   */
  // addLine(pipepos, width, color) {
  //   // 在 Scene 中的地形或3D Tiles上叠加的折线
  //   const line = new Cesium.GroundPolylinePrimitive({
  //     // 几何体实例化允许一个 Geometry 对象在多个对象中的位置不同的位置和独特的颜色
  //     geometryInstances: new Cesium.GeometryInstance({
  //       geometry: new Cesium.GroundPolylineGeometry({
  //         positions: Cesium.Cartesian3.fromDegreesArray(pipepos),
  //         width: width,
  //       }),
  //     }),
  //     appearance: new Cesium.PolylineMaterialAppearance({
  //       material: new Cesium.Material({
  //         fabric: {
  //           type: "Color",
  //           uniforms: {
  //             color,
  //           },
  //         },
  //       }),
  //     }),
  //   });
  //   this.tempPrimitives.add(line);
  // }
  // 删除所有tempCollection数据
  // tempCollectionRemove() {
  //   this.tempCollection.entities.removeAll(); //删除所有区划面线数据
  //   // this.tempPrimitives.removeAll(); //删除所有线|线特效
  //   // this.ldCollection.removeAll(); //删除所有单体化的数据集
  //   // this.tempBillCollection.entities.removeAll(); //删除所有临时点数据
  // }
  // 删除指定marker
  removeBillboard(entity) {
    this.billCollection.entities.remove(entity);
  }
  // 显示与隐藏billboard
  showBillboard(val: any = null, billArr: any = null) {
    const billboardArr = this.billCollection.entities.values;
    billboardArr.forEach((entity) => {
      const type = entity.properties.info._value.type;
      if (val == "all") {
        billArr.forEach((i) => {
          entity.show =
            i.menuType == type && i.eventType == "marker" ? true : entity.show;
        });
      } else if (val) {
        entity.show = type == val ? true : false;
      } else {
        entity.show = false;
      }
    });
  }

  /**
   * 切换视角
   * @param {*} name 全局视角/村部视角
   */
  changeViews(name, times = null) {
    const scene = this.viewer.scene;
    const { destination, orientation, time } = cameraView[name];
    scene.camera.flyTo({
      destination: new Cesium.Cartesian3(...destination),
      orientation,
      duration: times || time || 2,
    });
  }
}

export default AddScene;
