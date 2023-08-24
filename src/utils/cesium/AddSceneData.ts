import * as Cesium from "mars3d-cesium";
import cameraView from "./config/changeViews";
class AddScene {
  viewer: any;
  ldCollection: any; //加载单体化的数据集

  constructor(viewer) {
    this.viewer = viewer;
    this.init();
  }
  init() {
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
