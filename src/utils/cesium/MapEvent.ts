import * as Cesium from "cesium";
// import * as Cesium from "mars3d-cesium";
import * as mars3d from "mars3d";
import { cartesianToGeographic } from "./mapTools";
class MapEvent {
  viewer: any;
  highlightBuild: any;
  cartesian: any;
  firstPosition: any;
  secondPosition: any;
  pickObj: any;
  // pickShowLabel: any; //当前鼠标移入的label对象进行显示
  constructor(viewer) {
    this.viewer = viewer;
    this.highlightBuild = null;
    this.cartesian = null;
    this.firstPosition = null;
    this.secondPosition = null;
    this.pickObj = null;
  }

  /**
   * @description: 添加点击事件
   * @param {*} ck:回调函数
   */
  addClick(ck: any) {
    const viewer = this.viewer;
    const scene = this.viewer.scene;
    const that = this;
    viewer.on(mars3d.EventType.click, function (e) {
      //获取位置
      const pick = viewer.scene.pick(e.position);
      const picks = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        scene,
        e.cartesian
      ); //将WGS84坐标中的位置转换为图形缓冲区坐标。
      const cartographic = cartesianToGeographic(e.cartesian); //弧度 由经度，纬度和高度定义的位置
      that.pickObj = { ...cartographic, ...pick }; //存储点击经纬度与点击对象的值
      if (pick && pick.id) {
        const id = pick.id;
        //点击表单弹窗showTable
        if (id?.eventType == "showTable") {
          const tableInfo = {
            infoVal: id?.properties?.info?._value || id.properties,
            cartographic,
          };
          ck && ck(tableInfo, "showTable");
        } else if (id.type) {
          // 将点击数据传给回调函数
          ck && ck({ infoVal: id.properties, cartographic }, id.type);
        } else if (id?.properties?.info?._value.isClick) {
          //点击marker
          const infoVal = id?.properties?.info?._value;
          const billboardInfo = {
            infoVal,
            picks,
            cartographic,
          };
          that.firstPosition = { x: picks.x, y: picks.y };
          that.cartesian = e.cartesian;
          ck && ck(billboardInfo, "billboard");
        }
      } else {
        ck && ck({ cartographic });
      }
    });
  }
  // 添加模型移动高亮事件
  addBuildMove(ck: Function) {
    const viewer = this.viewer;
    let highlightBuild = this.highlightBuild;
    let primitive;
    viewer.on(mars3d.EventType.mouseMove, function (e) {
      //获取位置
      const pick = viewer.scene.pick(e.endPosition);
      if (pick && pick.id) {
        // 鼠标移入高亮
        if (pick.id.eventType == "moveHighlight") {
          //只有当面的事件类型为移动高亮时才执行
          if (highlightBuild) {
            highlightBuild.color = [220, 20, 60, 0];
          }
          // 获取当前鼠标移入对象
          primitive = pick.primitive.getGeometryInstanceAttributes(pick.id);
          highlightBuild = primitive;
          ck && ck(primitive);
        }
      } else {
        // 清除建筑高亮
        if (highlightBuild) highlightBuild.color = [220, 20, 60, 0];
      }
    });
  }
  // 获取将在渲染场景后立即引发的事件。
  scenePostRender(ck) {
    const viewer = this.viewer,
      scene = this.viewer.scene;
    viewer.scene.postRender.addEventListener(() => {
      // 获取相机位置与视角
      // const cameraPosition = viewer.camera.position;
      // console.log(cameraPosition);
      // const cameraHeading = viewer.camera.heading;
      // const cameraPitch = viewer.camera.pitch;
      // const cameraRoll = viewer.camera.roll;
      // console.log(cameraHeading, cameraPitch, cameraRoll);
      const cartesian = this.cartesian,
        firstPosition = this.firstPosition;
      if (cartesian)
        this.secondPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          scene,
          cartesian
        );
      //每一帧都监听两个位置是否一致
      if (
        firstPosition?.x + "" != this.secondPosition?.x + "" ||
        firstPosition?.y + "" != this.secondPosition?.y + ""
      ) {
        this.firstPosition = this.secondPosition;
        //监听每一帧该物体的坐标与屏幕位置的关系变化
        if (this.secondPosition) ck(this.secondPosition);
      }
    });
  }
  // 只执行一次的点击事件
  // getCartographic(ck) {
  //   const viewer = this.viewer;
  //   // const that = this;
  //   viewer.once(mars3d.EventType.leftDown, function (e) {
  //     const pick = viewer.scene.pick(e.position);
  //     const cartographic = mars3d.LngLatPoint.fromCartesian(e.cartesian); //弧度 由经度，纬度和高度定义的位置
  //     ck(cartographic, pick);
  //   });

  //   //off移除事件
  //   viewer.once(mars3d.EventType.rightClick, function () {
  //     viewer.off(mars3d.EventType.leftDown);
  //     ck();
  //     // that.addClick(""); //添加点击事件 避免事件被删除
  //   });
  // }
  // 只执行一次的点击事件
  getCartographic(ck) {
    const viewer = this.viewer;
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function onLeftClick(e) {
      const pick = viewer.scene.pick(e.position);
      const cartesian = viewer.scene.pickPosition(e.position); //返回根据深度缓冲区和窗口位置重构的笛卡尔位置。
      const cartographic = cartesianToGeographic(cartesian); //弧度 由经度，纬度和高度定义的位置
      handler.setInputAction(() => {
        //为viewer绑定LEFT_UP事件监听器（执行函数，监听的事件）
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP); // 解除viewer的LEFT_UP事件监听器
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN); // 解除viewer的LEFT_DOWN事件监听器
        ck(cartographic, pick);
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction(function () {
      handler.destroy();
      ck();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
}

export default MapEvent;
