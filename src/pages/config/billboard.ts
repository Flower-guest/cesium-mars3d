export const rule = {
  name: [{ required: true, message: "请填写标题", trigger: "blur" }],
  jj: [
    {
      required: true,
      message: "请填写简介",
      trigger: "blur",
    },
  ],
  img: [
    {
      required: true,
      message: "请填写图片地址",
      trigger: "blur",
    },
  ],
  qj: [
    {
      required: true,
      message: "请填写全景地址",
      trigger: "blur",
    },
  ],
  video: [
    {
      required: true,
      message: "请填写视频地址",
      trigger: "blur",
    },
  ],
};

export const formJsons = [
  { prop: "name", label: "标题", type: "input" },
  { prop: "jj", label: "简介", type: "input" },
  {
    prop: "infoType",
    label: "类型",
    type: "radio",
    radio: [
      { label: "图片", value: "img" },
      { label: "视频", value: "video" },
    ],
  },
];
export const imgRadio = [
  { prop: "img", label: "图片路径", type: "input" },
  { prop: "qj", label: "全景路径", type: "input" },
];
export const videoRadio = [{ prop: "video", label: "视频路径", type: "input" }];
