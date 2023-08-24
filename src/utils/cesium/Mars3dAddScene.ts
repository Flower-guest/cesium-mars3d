import * as mars3d from "mars3d";
import * as Cesium from "mars3d-cesium";
import { dTilesOption } from "./config/cesiumConfig";
import { ElLoading } from "element-plus";
export default class MeasureUnit {
  map3d: any;
  loadShp: any; //加载shp
  geoJsonLayer: any; //加载geoJson
  tileLayer: any; //添加影像图层
  polyline: any; //线对象
  polylinePrimitive: any; //线图层
  point: any; //点对象
  polygon: any; //面对象
  polygonPrimitive: any; //面图层
  billboard: any; //marker图层
  loading: any;

  constructor(map3d) {
    this.map3d = map3d;
    // geoJson
    this.geoJsonLayer = [];
    // polyline
    this.polylinePrimitive = new mars3d.layer.GraphicLayer();
    this.polyline = [];
    this.map3d.addLayer(this.polylinePrimitive);
    // polygon
    this.polygonPrimitive = new mars3d.layer.GraphicLayer();
    this.polygon = [];
    this.map3d.addLayer(this.polygonPrimitive);
    // point
    this.point = new mars3d.layer.GraphicLayer();
    this.map3d.addLayer(this.point);
    // billboard
    this.billboard = new mars3d.layer.GraphicLayer();
    this.map3d.addLayer(this.billboard);
  }
  // 添加影像图层
  addXyzLayer(options: any) {
    const params: any = {
      type: options.type || "xyz", // 类型
      url: options.url,
      layer: options.layer, // 图层名
      crs: options.crs || "EPSG:4326", // 坐标系信息
      chinaCRS: options.chinaCRS || "WGS84", // 国内坐标系
      minimumLevel: options.minLevel || 0, // 最低层级
      maximumLevel: options.maxLevel || 21, // 最高层级
      minimumTerrainLevel: options.minTer || 0, // 展示影像图层的最小地形细节级别
      maximumTerrainLevel: options.maxTer || 21, // 展示影像图层的最大地形细节级别
      brightness: options.bri || 1, // 亮度
      opacity: options.opa || 1, // 透明度
    };
    this.tileLayer = new mars3d.layer.XyzLayer(params);
    this.map3d.addLayer(this.tileLayer);
  }
  // 加载shp文件
  // loadShpFn(option) {
  //   this.loadShp = new mars3d.layer.Shp2JsonLayer({
  //     url: option.url,
  //     symbol: {
  //       styleOptions: {
  //         fill: true,
  //         color: option.color,
  //         opacity: option.opacity || 0.3,
  //         outline: true,
  //         outlineStyle: {
  //           color: option.lineColor || "#FED976",
  //           width: option.lineWidth || 3,
  //           opacity: option.lineOpa || 1,
  //         },
  //         // 高亮时的样式
  //         highlight: {
  //           opacity: 0.9,
  //         },
  //       },
  //     },
  //     flyTo: true,
  //   });
  //   this.map3d.addLayer(this.loadShp);
  // }
  // 添加3DTile模型
  addCesium3DTileSet(obj) {
    const tiles3dLayer = new mars3d.layer.TilesetLayer({
      name: obj.name,
      url: obj.url,
      position: obj?.Pos
        ? {
            lng: obj.Pos.lng,
            lat: obj.Pos.lat,
            alt: obj.heightOffset,
            alt_offset: obj.Pos.alt_offset,
          }
        : { alt: obj.heightOffset },
      maximumScreenSpaceError: obj.max,
      scale: obj?.Pos ? obj.Pos.sca : 1,
      ...dTilesOption,
      enableDebugWireframe: true, // 是否可以进行三角网的切换显示
      flyTo: false,
    });
    this.map3d.addLayer(tiles3dLayer);
  }
  // mars3d添加GeoJsonLayer
  addGeoJsonLayer(option: any) {
    const outline = option.outline || true;
    this.geoJsonLayer.push(
      new mars3d.layer.GeoJsonLayer({
        name: option?.name || null,
        url: option.url, //geojson文件或服务url地址
        data: option.data, //geojson格式规范数据对象，与url二选一即可。
        mask: option.mask || false, // 标识是否绘制区域边界的反选遮罩层
        symbol: {
          //Style样式
          styleOptions: {
            fill: option?.fill ?? true,
            randomColor: option?.randCol ?? false, // 随机色
            color: option?.randCol ? null : option?.color ?? "rgba(2,26,79,1)",
            opacity: option?.opc ?? 1,
            outline,
            outlineStyle: outline
              ? {
                  color: option?.outCol ?? "#FED976",
                  width: option?.outWid ?? 4,
                  opacity: option?.outOpc ?? 1,
                }
              : {},
            arcType: option?.arcType ?? Cesium.ArcType.GEODESIC,
            clampToGround: option?.clamp ?? true,
            // 面中心点，显示文字的配置
            label: option?.label ? this.addLabel(option.label) : {},
          },
        },
        flyTo: option?.flyTo ?? false,
      })
    );
    this.geoJsonLayer.forEach((i) => this.map3d.addLayer(i));
  }
  // 添加线
  addPolylinePrimitive(option: any) {
    const graphic = new mars3d.graphic.PolylinePrimitive({
      positions: option.positions,
      name: option.name,
      style: option.style
        ? {
            ...option.style,
            distanceDisplayCondition: option?.di ?? true, //是否按视距显示
            distanceDisplayCondition_far: option?.diFar ?? 200000, //最大距离
            distanceDisplayCondition_near: option?.diNear ?? 0, //最小距离
          }
        : {
            width: option?.width ?? 3,
            color: option.color,
            opacity: option?.opc ?? 1,
            distanceDisplayCondition: option?.di ?? false, //是否按视距显示
            distanceDisplayCondition_far: option?.diFar ?? Number.MAX_VALUE, //最大距离
            distanceDisplayCondition_near: option?.diNear ?? 0, //最小距离
            clampToGround: option.clamp ?? true,
            label: option?.label ? this.addLabel(option.label) : {},
          },
      flyTo: option?.flyTo ?? false,
    });
    this.polyline.push(graphic);
    this.polylinePrimitive.addGraphic(graphic);
  }
  // 添加面
  addPolygonPrimitive(option: any) {
    const graphic = new mars3d.graphic.PolygonPrimitive({
      positions: option.positions,
      name: option.name,
      style: option.style
        ? {
            ...option.style,
            distanceDisplayCondition: option?.di ?? true, //是否按视距显示
            distanceDisplayCondition_far: option?.diFar ?? 200000, //最大距离
            distanceDisplayCondition_near: option?.diNear ?? 0, //最小距离
          }
        : {
            width: option?.width ?? 3,
            color: option.color,
            opacity: option?.opc ?? 1,
            distanceDisplayCondition: option?.di ?? false, //是否按视距显示
            distanceDisplayCondition_far: option?.diFar ?? Number.MAX_VALUE, //最大距离
            distanceDisplayCondition_near: option?.diNear ?? 0, //最小距离
            clampToGround: option.clamp ?? true,
            label: option?.label ? this.addLabel(option.label) : {},
          },
      flyTo: option?.flyTo ?? false,
    });
    this.polygon.push(graphic);
    this.polygonPrimitive.addGraphic(graphic);
  }
  // 添加点
  addPoint(option: any) {
    const graphic = new mars3d.graphic.PointPrimitive({
      position: option.position,
      style: option.style,
    });
    this.point.addGraphic(graphic);
  }
  // 添加Billboard
  addBillboard(option: any) {
    const imgUrl = new URL(`../../assets/img/${option.img}`, import.meta.url)
      .href;
    const graphic = new mars3d.graphic.BillboardPrimitive({
      position: option.position,
      show: option?.show ?? false,
      attr: option?.attr ?? null,
      style: option.style
        ? option.style
        : {
            image: imgUrl,
            width: option?.w ?? 36,
            height: option?.h ?? 44,
            scale: option?.scale ?? 1,
            horizontalOrigin: option?.hor ?? Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: option?.ver ?? Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: option?.sc ?? true, //是否按视距缩放
            scaleByDistance_far: option?.scFar ?? 20000000, //上限
            scaleByDistance_farValue: option?.scFV ?? 0.1, //比例值
            scaleByDistance_near: option?.scNear ?? 1000, //下限
            scaleByDistance_nearValue: option?.scNV ?? 1, //比例值
            distanceDisplayCondition: option?.di ?? false, //是否按视距显示
            distanceDisplayCondition_far: option?.diFar ?? Number.MAX_VALUE, //最大距离
            distanceDisplayCondition_near: option?.diNear ?? 0, //最小距离
            clampToGround: option?.clamp ?? false, //是否贴地
            visibleDepth: option?.vD ?? false, //是否被遮挡
            label: option?.label ? this.addLabel(option.label) : {},
          },
    });
    this.billboard.addGraphic(graphic);
  }
  //添加文本元素
  addLabel(option: any) {
    return {
      text: option?.text, // 对应的属性名称
      opacity: option?.opa ?? 1,
      font_size: option?.fs ?? 25,
      color: option?.color ?? "#fff",
      font_family: option?.ff ?? "楷体",
      outline: option?.outline ?? false,
      outlineStyle: option?.outline
        ? {
            color: option?.outCol ?? "#FED976",
            width: option?.outWid ?? 3,
            opacity: option?.outOpa ?? 1,
          }
        : {},
      pixelOffsetY: option?.pY ?? 0,
      background: option?.bg ?? false,
      backgroundColor: option?.bgc ?? "#000000",
      backgroundOpacity: option?.bgo ?? 0.5,
      backgroundPadding: new Cesium.Cartesian2(
        option.bgp[0] || 7,
        option.bgp[1] || 5
      ),
      scaleByDistance: option?.sc ?? true, //是否按视距缩放
      scaleByDistance_far: option?.scFar ?? 20000000, //上限
      scaleByDistance_farValue: option?.scFV ?? 0.1, //比例值
      scaleByDistance_near: option?.scNear ?? 1000, //下限
      scaleByDistance_nearValue: option?.scNV ?? 1, //比例值
      distanceDisplayCondition: option?.di ?? false, //是否按视距显示
      distanceDisplayCondition_far: option?.diFar ?? Number.MAX_VALUE, //最大距离
      distanceDisplayCondition_near: option?.diNear ?? 0, //最小距离
      clampToGround: option?.clamp ?? false, //是否贴地
      visibleDepth: option?.vD ?? true, //是否被遮挡
      addHeight: option?.addHeight ?? 0, //在现有坐标基础上增加的高度值
    };
  }
  // 显示与隐藏billboard
  showBillboard(val: any = null, billArr: any = null) {
    this.loading = ElLoading.service({
      lock: true,
      text: "正在加载中....",
      background: "rgba(0, 0, 0, 0.5)",
    });
    const billboardArr = this.billboard.graphics;
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
  // 删除元素
  deleteFn() {
    if (this.geoJsonLayer.length > 0) {
      this.geoJsonLayer.forEach((i) => {
        if (i.name !== "LHSBJX") {
          i.clear();
          this.map3d.removeLayer(i, true);
        }
      }); //删除mars3d划的线
      this.geoJsonLayer = [];
    }
    if (this.polyline.length > 0) {
      this.polyline.forEach((i) => {
        if (i.name !== "LHSBJX") {
          i.remove();
        }
      }); //删除mars3d划的线
      this.polyline = [];
    }
    if (this.polygon.length > 0) {
      this.polygon.forEach((i) => {
        if (i.name !== "LHSBJX") {
          i.remove();
        }
      }); //删除mars3d划的线
      this.polygon = [];
    }
  }
}
