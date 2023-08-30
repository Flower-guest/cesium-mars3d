import LHSCZKFBJXAreas from "@/assets/json/LHSCZKFBJXAreas.json";
import LHSSTBHHXAreas from "@/assets/json/LHSSTBHHXAreas.json";
import LHSTDLYGHAreas from "@/assets/json/LHSTDLYGHAreas.json";
import LHSYJJBNTBHX from "@/assets/json/LHSYJJBNTBHX.json";
import wangGe from "@/assets/json/wangge.json";

export const jcbBtnTool = {
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
      btnType: "zszc",
      btnName: "招商资产",
      active: "zszc",
      chooseType: "checkbox",
      img: "icon_cyzs.png",
      w: 26,
      h: 24,
    },
  ],
  zl: [
    {
      btnType: "zcdt",
      btnName: "资产地图",
      active: "zcdt",
      chooseType: "checkbox",
      img: "icon_zcdt.png",
      w: 22,
      h: 21,
      manyClass: true,
    },
  ],
};

export const jcbToolMenu = {
  cjdl: {
    name: "全部场景",
    menuType: "all",
    eventType: "showAll",
    changeName: "LHS",
    child: [
      {
        name: "交通设施",
        menuType: "jtss",
        eventType: "marker",
      },
      {
        name: "政府机构",
        menuType: "zfjg",
        eventType: "marker",
      },
      {
        name: "配套设施",
        menuType: "ptss",
        eventType: "marker",
      },
      {
        name: "商超点位",
        menuType: "scdw",
        eventType: "marker",
      },
      {
        name: "旅游景点",
        menuType: "lyjd",
        eventType: "marker",
      },
      {
        name: "其它",
        menuType: "qtdw",
        eventType: "marker",
      },
    ],
  },
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
  zszc: {
    name: "全部招商",
    menuType: "all",
    eventType: "showAll",
    changeName: "LHS",
    child: [
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
  },
  zcdt: [
    {
      name: "房屋资产",
      menuType: "all",
      eventType: "showAll",
      changeName: "LHS",
      isInd: false,
      check: false,
      cities: [],
      childMenuType: "fwzc",
    },
    {
      name: "其它资产",
      menuType: "all",
      eventType: "showAll",
      changeName: "LHS",
      isInd: false,
      check: false,
      cities: [],
      child: [
        {
          name: "耕地",
          menuType: "gd",
          eventType: "marker",
        },
        {
          name: "林地",
          menuType: "ld",
          eventType: "marker",
        },
        {
          name: "水域地",
          menuType: "syd",
          eventType: "marker",
        },
        {
          name: "交通地",
          menuType: "jtd",
          eventType: "marker",
        },
        {
          name: "商服地",
          menuType: "sfd",
          eventType: "marker",
        },
        {
          name: "工业地",
          menuType: "gyd",
          eventType: "marker",
        },
        {
          name: "仓储地",
          menuType: "ccd",
          eventType: "marker",
        },
        {
          name: "其它",
          menuType: "qtd",
          eventType: "marker",
        },
      ],
    },
  ],
};

export const tybBtnTool = {
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
      btnType: "xcgh",
      btnName: "乡村规划",
      active: "xcgh",
      chooseType: "radio",
      img: "icon_tdgh.png",
      w: 24,
      h: 21,
    },
    {
      btnType: "zcxm",
      btnName: "招商项目",
      active: "zcxm",
      chooseType: "checkbox",
      img: "icon_zczs.png",
      w: 26,
      h: 28,
      manyClass: true,
    },
    {
      btnType: "zszc",
      btnName: "招商资产",
      active: "zszc",
      chooseType: "checkbox",
      img: "icon_cyzs.png",
      w: 26,
      h: 24,
    },
  ],
  zl: [
    {
      btnType: "zcdt",
      btnName: "资产地图",
      active: "zcdt",
      chooseType: "checkbox",
      img: "icon_zcdt.png",
      w: 22,
      h: 21,
      manyClass: true,
    },
  ],
};

export const tybToolMenu = {
  cjdl: {
    name: "全部场景",
    menuType: "all",
    eventType: "showAll",
    changeName: "LHS",
    child: [
      {
        name: "交通设施",
        menuType: "jtss",
        eventType: "marker",
      },
      {
        name: "政府机构",
        menuType: "zfjg",
        eventType: "marker",
      },
      {
        name: "配套设施",
        menuType: "ptss",
        eventType: "marker",
      },
      {
        name: "商超点位",
        menuType: "scdw",
        eventType: "marker",
      },
      {
        name: "旅游景点",
        menuType: "lyjd",
        eventType: "marker",
      },
      {
        name: "其它",
        menuType: "qtdw",
        eventType: "marker",
      },
    ],
  },
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
  xcgh: [
    {
      name: "土地利用规划",
      menuType: "LHSTDLYGHAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSTDLYGHAreas,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "manyColor",
    },
    {
      name: "城镇开发边界",
      menuType: "LHSCZKFBJXAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSCZKFBJXAreas,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "rgba(192,233,247.6)",
    },
    {
      name: "生态保护线",
      menuType: "LHSSTBHHXAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSSTBHHXAreas,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "rgba(151,255,99,.6)",
    },
    {
      name: "基本农田保护线",
      menuType: "LHSYJJBNTBHX",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSYJJBNTBHX,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "rgba(240,192,99.6)",
    },
  ],
  zcxm: [
    {
      name: "规划项目",
      menuType: "all",
      eventType: "showAll",
      isInd: false,
      check: false,
      cities: [],
      childMenuType: "ghxm",
      changeName: "LHS",
    },
    {
      name: "已建项目",
      menuType: "all",
      eventType: "showAll",
      isInd: false,
      check: false,
      cities: [],
      changeName: "LHS",
      child: [
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
    },
  ],
  zszc: {
    name: "全部招商",
    menuType: "all",
    eventType: "showAll",
    changeName: "LHS",
    child: [
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
  },
  zcdt: [
    {
      name: "房屋资产",
      menuType: "all",
      eventType: "showAll",
      changeName: "LHS",
      isInd: false,
      check: false,
      cities: [],
      childMenuType: "fwzc",
    },
    {
      name: "其它资产",
      menuType: "all",
      eventType: "showAll",
      changeName: "LHS",
      isInd: false,
      check: false,
      cities: [],
      child: [
        {
          name: "耕地",
          menuType: "gd",
          eventType: "marker",
        },
        {
          name: "林地",
          menuType: "ld",
          eventType: "marker",
        },
        {
          name: "水域地",
          menuType: "syd",
          eventType: "marker",
        },
        {
          name: "交通地",
          menuType: "jtd",
          eventType: "marker",
        },
        {
          name: "商服地",
          menuType: "sfd",
          eventType: "marker",
        },
        {
          name: "工业地",
          menuType: "gyd",
          eventType: "marker",
        },
        {
          name: "仓储地",
          menuType: "ccd",
          eventType: "marker",
        },
        {
          name: "其它",
          menuType: "qtd",
          eventType: "marker",
        },
      ],
    },
  ],
};

export const wzbBtnTool = {
  jj: [
    {
      btnType: "zbzy",
      btnName: "周边资源",
      active: "zbzy",
      chooseType: "radio",
      img: "icon_zbzy.png",
      w: 25,
      h: 24,
    },
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
      btnType: "xcgh",
      btnName: "乡村规划",
      active: "xcgh",
      chooseType: "radio",
      img: "icon_tdgh.png",
      w: 24,
      h: 21,
    },
    {
      btnType: "zcxm",
      btnName: "招商项目",
      active: "zcxm",
      chooseType: "checkbox",
      img: "icon_zczs.png",
      w: 26,
      h: 28,
      manyClass: true,
    },
    {
      btnType: "zszc",
      btnName: "招商资产",
      active: "zszc",
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
      manyClass: true,
    },
  ],
};
/*
  changeName:切换视角
  eventType:事件类型
  menuType:菜单事件类型
*/
export const wzbToolMenu = {
  zbzy: [
    {
      name: "莲花山",
      eventType: "mx",
      changeName: "LHS",
      menuType: "lhs",
      url: null,
    },
    {
      name: "大王山旅游度假区",
      eventType: "mx",
      menuType: "dws",
      changeName: "DaWangShan",
      url:
        import.meta.env.VITE_BASE_URL +
        "/M_S_DaWangShan/Production_3dtittle.json",
      alt: 59,
      max: 1,
    },
  ],
  cjdl: {
    name: "全部场景",
    menuType: "all",
    eventType: "showAll",
    changeName: "LHS",
    child: [
      {
        name: "交通设施",
        menuType: "jtss",
        eventType: "marker",
      },
      {
        name: "政府机构",
        menuType: "zfjg",
        eventType: "marker",
      },
      {
        name: "配套设施",
        menuType: "ptss",
        eventType: "marker",
      },
      {
        name: "商超点位",
        menuType: "scdw",
        eventType: "marker",
      },
      {
        name: "旅游景点",
        menuType: "lyjd",
        eventType: "marker",
      },
      {
        name: "其它",
        menuType: "qtdw",
        eventType: "marker",
      },
    ],
  },
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
  xcgh: [
    {
      name: "土地利用规划",
      menuType: "LHSTDLYGHAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSTDLYGHAreas,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "manyColor",
    },
    {
      name: "城镇开发边界",
      menuType: "LHSCZKFBJXAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSCZKFBJXAreas,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "rgba(192,233,247.6)",
    },
    {
      name: "生态保护线",
      menuType: "LHSSTBHHXAreas",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSSTBHHXAreas,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "rgba(151,255,99,.6)",
    },
    {
      name: "基本农田保护线",
      menuType: "LHSYJJBNTBHX",
      eventType: "geojson",
      changeName: "LHS",
      geoType: "polygonLine",
      url: LHSYJJBNTBHX,
      lineColor: "rgba(0,0,0,.6)",
      lineWidth: 1,
      polygonColor: "rgba(240,192,99.6)",
    },
  ],
  zcxm: [
    {
      name: "规划项目",
      menuType: "all",
      eventType: "showAll",
      isInd: false,
      check: false,
      cities: [],
      childMenuType: "ghxm",
      changeName: "LHS",
    },
    {
      name: "已建项目",
      menuType: "all",
      eventType: "showAll",
      isInd: false,
      check: false,
      cities: [],
      changeName: "LHS",
      child: [
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
    },
  ],
  zszc: {
    name: "全部招商",
    menuType: "all",
    eventType: "showAll",
    changeName: "LHS",
    child: [
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
  },
  zldt: {
    name: "全部点位",
    menuType: "all",
    eventType: "showAll",
    changeName: "LHS",
    child: [
      {
        name: "网格划分",
        menuType: "wghf",
        eventType: "geojson",
        changeName: "LHS",
        geoType: "polygonLine",
        lineColor: "rgba(0,0,0,.6)",
        lineWidth: 1,
        polygonColor: "manyColor",
        url: wangGe,
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
  },
  zcdt: [
    {
      name: "房屋资产",
      menuType: "all",
      eventType: "showAll",
      changeName: "LHS",
      isInd: false,
      check: false,
      cities: [],
      childMenuType: "fwzc",
    },
    {
      name: "其它资产",
      menuType: "all",
      eventType: "showAll",
      changeName: "LHS",
      isInd: false,
      check: false,
      cities: [],
      child: [
        {
          name: "耕地",
          menuType: "gd",
          eventType: "marker",
        },
        {
          name: "林地",
          menuType: "ld",
          eventType: "marker",
        },
        {
          name: "水域地",
          menuType: "syd",
          eventType: "marker",
        },
        {
          name: "交通地",
          menuType: "jtd",
          eventType: "marker",
        },
        {
          name: "商服地",
          menuType: "sfd",
          eventType: "marker",
        },
        {
          name: "工业地",
          menuType: "gyd",
          eventType: "marker",
        },
        {
          name: "仓储地",
          menuType: "ccd",
          eventType: "marker",
        },
        {
          name: "其它",
          menuType: "qtd",
          eventType: "marker",
        },
      ],
    },
  ],
};
