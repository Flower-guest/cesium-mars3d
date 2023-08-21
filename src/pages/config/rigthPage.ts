import LHSJTZSLine from "@/assets/json/LHSJTZSLine.json";

export const btnTool = {
  jj: [
    {
      btnType: "cjdl",
      btnName: "场景导览",
      active: "cjdl",
      img: "icon-cjdl.png",
      w: 25,
      h: 24,
      chooseType: "checkbox",
    },
    {
      btnType: "kjcl",
      btnName: "空间量测",
      active: "kjcl",
      img: "icon_kjcl.png",
      w: 23,
      h: 24,
    },
    {
      btnType: "wzss",
      btnName: "位置搜索",
      active: "wzss",
      img: "icon_wzss.png",
      w: 24,
      h: 27,
    },
  ],
  fz: [
    {
      btnType: "cygh",
      btnName: "产业规划",
      active: "cygh",
      chooseType: "radio",
      img: "icon_cygh.png",
      w: 24,
      h: 24,
    },
    {
      btnType: "tdgh",
      btnName: "土地规划",
      active: "tdgh",
      chooseType: "radio",
      img: "icon_tdgh.png",
      w: 24,
      h: 21,
    },
    {
      btnType: "zczs",
      btnName: "资产招商",
      active: "zczs",
      chooseType: "checkbox",
      img: "icon_zczs.png",
      w: 26,
      h: 28,
    },
    {
      btnType: "cyzs",
      btnName: "产业招商",
      active: "cyzs",
      chooseType: "checkbox",
      img: "icon_cyzs.png",
      w: 26,
      h: 24,
    },
  ],
  zl: [
    {
      btnType: "zldt",
      btnName: "治理地图",
      active: "zldt",
      chooseType: "checkbox",
      img: "icon_zldt.png",
      w: 23,
      h: 24,
    },
    {
      btnType: "zcdt",
      btnName: "资产地图",
      active: "zcdt",
      chooseType: "checkbox",
      img: "icon_zcdt.png",
      w: 22,
      h: 21,
    },
    // {
    //   btnType: "zcgl",
    //   btnName: "资产管理",
    //   active: "zcgl",
    // },
    // {
    //   btnType: "afgl",
    //   btnName: "安防管理",
    //   active: "afgl",
    // },
  ],
};

export const toolMenu = {
  cjdl: [
    {
      name: "全部场景",
      menuType: "all",
      eventType: "showAll",
      changeName: "LHS",
    },
    {
      name: "交通展示",
      menuType: "jtzs",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "line",
      lineUrl: LHSJTZSLine,
    },
    // {
    //   name: "政府机构",
    //   menuType: "zfjg",
    //   eventType: "marker",
    //   changeName: "LHS",
    // },
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
    // {
    //   name: "全景点位",
    //   menuType: "qjdw",
    //   eventType: "marker",
    //   changeName: "LHS",
    // },
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
  cygh: [
    {
      name: "企业规划",
      menuType: "qygh",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
    },
    {
      name: "交通规划",
      menuType: "jtgh",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
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
  zczs: [
    {
      name: "住宅招商",
      menuType: "zzzs",
      eventType: "marker",
    },
    {
      name: "耕地招商",
      menuType: "gdzs",
      eventType: "marker",
    },
    {
      name: "林地招商",
      menuType: "ldzs",
      eventType: "marker",
    },
    {
      name: "水域地招商",
      menuType: "sydzs",
      eventType: "marker",
    },
    {
      name: "交通地招商",
      menuType: "jtdzs",
      eventType: "marker",
    },
    {
      name: "商服地招商",
      menuType: "sfdzs",
      eventType: "marker",
    },
    {
      name: "工业地招商",
      menuType: "gydzs",
      eventType: "marker",
    },
    {
      name: "仓储地招商",
      menuType: "ccdzs",
      eventType: "marker",
    },
    {
      name: "其它地类",
      menuType: "qtdl",
      eventType: "marker",
    },
  ],
  cyzs: [
    {
      name: "粮油产业",
      menuType: "lycy",
      eventType: "marker",
    },
    {
      name: "果蔬产业",
      menuType: "gscy",
      eventType: "marker",
    },
    {
      name: "药材产业",
      menuType: "yccy",
      eventType: "marker",
    },
    {
      name: "茶产业",
      menuType: "ccy",
      eventType: "marker",
    },
    {
      name: "菌菇产业",
      menuType: "jgcy",
      eventType: "marker",
    },
    {
      name: "花卉产业",
      menuType: "hhcy",
      eventType: "marker",
    },
    {
      name: "畜牧养殖业",
      menuType: "xmyzy",
      eventType: "marker",
    },
    {
      name: "渔业",
      menuType: "yy",
      eventType: "marker",
    },
  ],
  zldt: [
    {
      name: "全部点位",
      menuType: "qb",
      eventType: "marker",
    },
    {
      name: "网格划分",
      menuType: "wghf",
      eventType: "marker",
    },
    {
      name: "视频监控",
      menuType: "spjk",
      eventType: "marker",
    },
    {
      name: "重点人群",
      menuType: "zdrq",
      eventType: "marker",
    },
    {
      name: "危险源点位",
      menuType: "wxydw",
      eventType: "marker",
    },
  ],
  zcdt: [],
  zcgl: [
    {
      name: "资产查询",
      menuType: "zccx",
      eventType: "addMarker",
      addMarkerType: "zc",
    },
    {
      name: "添加资产",
      menuType: "xz",
      eventType: "addMarker",
      addMarkerType: "zc",
    },
    {
      name: "编辑资产信息",
      menuType: "bj",
      eventType: "addMarker",
      addMarkerType: "zc",
    },
    {
      name: "删除资产",
      menuType: "sc",
      eventType: "addMarker",
      addMarkerType: "zc",
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
  ],
  afgl: [
    {
      name: "添加安防点",
      menuType: "xz",
      eventType: "addMarker",
      addMarkerType: "afd",
    },
    {
      name: "编辑安防点",
      menuType: "bj",
      eventType: "addMarker",
      addMarkerType: "afd",
    },
    {
      name: "删除安防点",
      menuType: "sc",
      eventType: "addMarker",
      addMarkerType: "afd",
    },
  ],
};
