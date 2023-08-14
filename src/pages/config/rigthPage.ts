import LHSJTZSLine from "@/assets/json/LHSJTZSLine.json";

export const btnTool = {
  sp: [
    {
      btnType: "jgqxw",
      btnName: "景观千寻网",
      active: "jgqxw",
    },
    {
      btnType: "cjdl",
      btnName: "场景导览",
      active: "cjdl",
    },
    {
      btnType: "kjcl",
      btnName: "空间量测",
      active: "kjcl",
    },
    {
      btnType: "wzss",
      btnName: "位置搜索",
      active: "wzss",
    },
  ],
  zs: [
    {
      btnType: "tdgh",
      btnName: "土地规划",
      active: "tdgh",
    },
    {
      btnType: "jtgh",
      btnName: "交通规划",
      active: "jtgh",
    },
    {
      btnType: "cygh",
      btnName: "产业规划",
      active: "cygh",
    },
    {
      btnType: "cyzs",
      btnName: "产业招商",
      active: "cyzs",
    },
  ],
  zl: [
    {
      btnType: "afzl",
      btnName: "安防治理",
      active: "afzl",
    },
    {
      btnType: "zydt",
      btnName: "资源地图",
      active: "zydt",
    },
    {
      btnType: "zcgl",
      btnName: "资产管理",
      active: "zcgl",
    },
  ],
};

export const toolMenu = {
  cjdl: [
    {
      name: "全部",
      menuType: "all",
      eventType: "showAll",
    },
    {
      name: "交通展示",
      menuType: "jtzs",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "line",
      lineUrl: LHSJTZSLine,
    },
    {
      name: "政府机构",
      menuType: "zfjg",
      eventType: "marker",
      changeName: "LHS",
    },
    {
      name: "医护点位",
      menuType: "yhdw",
      eventType: "marker",
      changeName: "LHS",
    },
    {
      name: "文教点位",
      menuType: "wjdw",
      eventType: "marker",
      changeName: "LHS",
    },
    {
      name: "商超点位",
      menuType: "scdw",
      eventType: "marker",
      changeName: "LHS",
    },
    {
      name: "旅游景点",
      menuType: "lyjd",
      eventType: "marker",
      changeName: "LHS",
    },
    {
      name: "全景点位",
      menuType: "qjdw",
      eventType: "marker",
      changeName: "LHS",
    },
  ],
  kjcl: [
    {
      name: "直线量距",
      menuType: "zxlj",
      eventType: "measure",
    },
    {
      name: "水平面积",
      menuType: "spmj",
      eventType: "measure",
    },
    {
      name: "地表面积",
      menuType: "dbmj",
      eventType: "measure",
    },
    {
      name: "清除",
      menuType: "qc",
      eventType: "measure",
    },
  ],
  tdgh: [
    {
      name: "土地利用",
      menuType: "LHSTDLYGHAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
    },
    {
      name: "城镇开发",
      menuType: "LHSCZKFBJXAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
    },
    {
      name: "生态保护",
      menuType: "LHSSTBHHXAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
    },
    {
      name: "基本农田",
      menuType: "LHSYJJBNTBHX",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
    },
  ],
  jtgh: [],
  cygh: [],
  cyzs: [
    {
      name: "住宅用地",
      menuType: "zzyd",
      eventType: "marker",
    },
    {
      name: "商业用地",
      menuType: "syyd",
      eventType: "marker",
    },
    {
      name: "工业用地",
      menuType: "gyyd",
      eventType: "marker",
    },
    {
      name: "林地",
      menuType: "ld",
      eventType: "marker",
    },
    {
      name: "耕地",
      menuType: "gd",
      eventType: "marker",
    },
    {
      name: "园地",
      menuType: "yd",
      eventType: "marker",
    },
    {
      name: "草地",
      menuType: "cd",
      eventType: "marker",
    },
    {
      name: "工矿仓储",
      menuType: "gkccyd",
      eventType: "marker",
    },
    {
      name: "商服用地",
      menuType: "sfyd",
      eventType: "marker",
    },
    {
      name: "管理服务",
      menuType: "ggglyggfwyd",
      eventType: "marker",
    },
    {
      name: "交通运输",
      menuType: "jtysyd",
      eventType: "marker",
    },
    {
      name: "水域水利",
      menuType: "syjslssyd",
      eventType: "marker",
    },
    {
      name: "其它用房",
      menuType: "qtyf",
      eventType: "marker",
    },
    {
      name: "特殊用地",
      menuType: "tsyd",
      eventType: "marker",
    },
  ],
  afzl: [
    {
      name: "治理网格",
      menuType: "zlwg",
      eventType: "geojson",
    },
    {
      name: "监控点位",
      menuType: "jkdw",
      eventType: "marker",
      changeName: "LHS",
    },
    {
      name: "重点关照",
      menuType: "zdgzrq",
      eventType: "marker",
    },
    {
      name: "危险分布",
      menuType: "wxyfb",
      eventType: "marker",
    },
    {
      name: "监测点位",
      menuType: "jcdw",
      eventType: "marker",
    },
  ],
  zydt: [
    {
      name: "全部",
      menuType: "qb",
      eventType: "marker",
    },
    {
      name: "房屋资产",
      menuType: "fwzc",
      eventType: "marker",
    },
    {
      name: "山林资产",
      menuType: "slzc",
      eventType: "marker",
    },
    {
      name: "水塘资产",
      menuType: "stzc",
      eventType: "marker",
    },
    {
      name: "田地资产",
      menuType: "tdzc",
      eventType: "marker",
    },
  ],
  zcgl: [
    {
      name: "新增资产",
      menuType: "xzzc",
      eventType: "addMarker",
    },
    {
      name: "编辑资产",
      menuType: "bjzc",
      eventType: "addMarker",
    },
    {
      name: "删除资产",
      menuType: "sczc",
      eventType: "addMarker",
    },
    {
      name: "绘制线",
      menuType: "hzx",
      eventType: "draw",
    },
    {
      name: "绘制面",
      menuType: "hzm",
      eventType: "draw",
    },
    // {
    //   name: "编辑对象",
    //   menuType: "bjdx",
    //   eventType: "draw",
    // },
  ],
};
