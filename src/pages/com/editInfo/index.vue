<!--
 * @Author: cxj 1481240653@qq.com
 * @Date: 2023-07-14 15:45:44
 * @LastEditors: cxj 1481240653@qq.com
 * @LastEditTime: 2023-08-03 09:11:02
 * @FilePath: \lhs-demo\src\components\TableList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="text-center text-#fff bg-[#28465d] text-24px py-10px px-10px">
      资产信息编辑
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="基本信息" name="first">
        <el-row>
          <el-col :span="8" class="text-center"><div>属性字段</div></el-col>
          <el-col :span="16" class="text-center"><div>属性值</div></el-col>
        </el-row>
        <el-row class="row px-10px">
          <template v-for="i in baseInfo" :key="i.label">
            <el-col :span="6" class="flex items-center text-[12px] px-20px"
              >{{ i.label }}:</el-col
            >
            <el-col :span="18"
              ><el-input v-model="baseInfos[i.model]"
            /></el-col>
          </template>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="全景视频" name="second">
        <el-row class="row px-10px ss">
          <el-col :span="6">全景预览图：</el-col>
          <el-col :span="18"><el-input v-model="qjInfos.qjImgUrl" /></el-col>
          <el-col :span="6">全景地址：</el-col>
          <el-col :span="18"><el-input v-model="qjInfos.qjUrl" /></el-col>
          <el-col :span="6">视频地址：</el-col>
          <el-col :span="18"><el-input v-model="qjInfos.videoUrl" /></el-col>
          <el-col :span="8">图片列表：</el-col>
        </el-row>
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          class="upload"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove()"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="招商信息" name="third">
        <el-row>
          <el-col :span="8" class="text-center"><div>属性字段</div></el-col>
          <el-col :span="16" class="text-center"><div>属性值</div></el-col>
        </el-row>
        <el-row class="row px-10px">
          <template v-for="i in mercInfo" :key="i.label">
            <el-col :span="8" class="flex items-center px-20px"
              >{{ i.label }}:</el-col
            >
            <el-col :span="16"
              ><el-input v-model="mercInfos[i.model]"
            /></el-col>
          </template>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { baseInfo, mercInfo } from "./config";
import { Delete, Plus } from "@element-plus/icons-vue";
import type { UploadUserFile } from "element-plus";

const activeName = ref("first");
const baseInfos = reactive({}); //基本信息
const qjInfos = reactive({
  qjImgUrl: "",
  qjUrl: "",
  videoUrl: "",
}); //全景信息
const mercInfos = reactive({}); //招商信息

const fileList = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const init = () => {
  baseInfo.forEach((e) => {
    baseInfos[e.model] = e.value;
  });
  mercInfo.forEach((e) => {
    mercInfos[e.model] = e.value;
  });
};
init();

const handleRemove = () => {
  fileList.value.pop();
};
</script>

<style lang="less" scoped>
:deep(.demo-tabs) {
  .row {
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
  }
  // .row::-webkit-scrollbar {
  //   display: none; /* Chrome Safari */
  // }
  .el-col {
    margin: 5px 0;
  }
  .el-tabs__nav {
    width: 100%;
    justify-content: center;
  }
  .ss > .el-col {
    display: flex;
    padding-left: 20px;
    align-items: center;
  }
  .el-input__inner {
    color: #2c3150;
    font-size: 12px;
  }
  .upload {
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 30px;
    .el-upload-list {
      justify-content: space-between;

      .el-upload-list__item,
      .el-upload {
        width: 100px;
        height: 100px;
      }
    }
  }
  .upload::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
