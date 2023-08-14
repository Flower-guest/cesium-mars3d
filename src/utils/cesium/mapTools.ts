import * as Cesium from "mars3d-cesium";

/**
 * 笛卡尔转经纬度
 * @param {*} cartesian 笛卡尔坐标
 */
export function transformCartesianToWGS84(cartesian) {
  //将笛卡尔坐标转化为弧度坐标
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  //将弧度坐标转换为经纬度坐标（先转弧度再转经纬度简单一点，直接转换的方法也有，不过推荐用这种）
  const longitude = Cesium.Math.toDegrees(cartographic.longitude); //经度
  const latitude = Cesium.Math.toDegrees(cartographic.latitude); //纬度
  const height = cartographic.height; //高度
  return { lng: longitude, lat: latitude, h: height };
}

//获取坐标串 不带高度
export function getDegreesArray(feature) {
  const degreesArray: any = [];
  let coordinates;
  if (feature.geometry.type == "MultiPolygon") {
    const valArr = feature.geometry.coordinates;
    coordinates = [];
    for (let i = 0; i < valArr.length; i++) {
      coordinates = coordinates.concat(valArr[i][0]);
    }
  } else if (feature.geometry.type == "Polygon") {
    coordinates = feature.geometry.coordinates[0];
  } else if (feature.geometry.type == "LineString") {
    coordinates = feature.geometry.coordinates;
  }

  for (let i = 0; i < coordinates.length; i++) {
    const element = coordinates[i];
    degreesArray.push(element[0]);
    degreesArray.push(element[1]);
  }
  return degreesArray;
}

/**
 * 笛卡尔转经纬度
 * @param {*} cartesian 笛卡尔坐标
 */
export function cartesianToGeographic(position) {
  const cartographic = Cesium.Cartographic.fromCartesian(position); //将笛卡尔坐标转成弧度 由经度，纬度和高度定义的位置。
  //将弧度坐标转换为经纬度坐标
  const longitude = Cesium.Math.toDegrees(cartographic.longitude); //经度
  const latitude = Cesium.Math.toDegrees(cartographic.latitude); //纬度
  const height = cartographic.height.toFixed(1); //高度

  return { lng: longitude, lat: latitude, h: height };
}
