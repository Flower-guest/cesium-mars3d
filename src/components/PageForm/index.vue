<template>
  <div v-for="i in formJson" :key="i.prop">
    <el-form-item :label="i.label" :prop="i.prop">
      <!-- 输入框 -->
      <template v-if="i.type == 'input'">
        <el-input v-model="form[i.prop]" />
      </template>
      <!-- 下拉框+按钮 -->
      <template v-else-if="i.isSelectBtn">
        <el-select
          v-model="form[formJson.prop]"
          class="s_o"
          placeholder="请选择"
        >
          <el-option
            v-for="optI in selectOpt[formJson.prop]"
            :key="optI.id"
            :label="optI.value"
            :value="optI.id"
          />
        </el-select>
        <slot name="selectBtn"></slot>
      </template>
      <!-- 下拉框 -->
      <template v-else-if="i.type == 'select'">
        <el-select v-model="form[formJson.prop]" placeholder="请选择">
          <el-option
            v-for="optI in selectOpt[formJson.prop]"
            :key="optI.id"
            :label="optI.value"
            :value="optI.id"
          />
        </el-select>
      </template>
      <!-- 上传 -->
      <!-- <template v-else-if="item.type == 'upload'">
        <el-upload
          accept="image/png, image/jpeg"
          :limit="1"
          ref="uploadRef"
          class="avatar-uploader"
          :on-change="handleChange"
          :http-request="uploadFile"
          :show-file-list="false"
        >
          <template v-if="form[formJson.prop]">
            <img :src="form[formJson.prop]" class="w-80px" />
          </template>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </template> -->
      <!-- 单选框 -->
      <template v-else-if="i.type == 'radio'">
        <el-radio-group v-model="form[i.prop]">
          <template v-for="radioItem in i.radio" :key="radioItem.value">
            <el-radio :label="radioItem.value" size="large">{{
              radioItem.label
            }}</el-radio>
          </template>
        </el-radio-group>
      </template>
      <!-- 颜色选择器 -->
      <template v-else-if="i.type == 'color'">
        <el-color-picker v-model="form[i.prop]" show-alpha />
      </template>
    </el-form-item>
  </div>
  <!-- 保存等功能按钮 -->
  <div>
    <slot name="formBtn"></slot>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

// import { requestUploadImg } from "@/service/map";
// import type {
//   UploadProps,
//   UploadInstance,
//   UploadRequestOptions,
//   UploadRequestHandler,
// } from "element-plus";
// import { ElLoading } from "element-plus";

interface Props {
  form?: any;
  formJson?: any;
  selectOpt?: any;
}
const props = defineProps<Props>();

const { form, formJson } = toRefs(props);
// const formJson = toRefs(props, "formJson");

// 通过ref获取元素对象
// const uploadRef = ref<UploadInstance | any>(null);

// 清空上传图片列表
// const handleChange: UploadProps["onChange"] = () => {
//   uploadRef.value.clearFiles();
// };
// 文件上传
// const uploadFile: UploadRequestHandler = async (
//   options: UploadRequestOptions
// ) => {
//   const loading = ElLoading.service({
//     lock: true,
//     text: "正在加载中....",
//     background: "rgba(0, 0, 0, 0.5)",
//   });
//   const formData = new FormData();
//   formData.append("file", options.file);
//   formData.append("IDIP", "186");
//   try {
//     const response = await requestUploadImg(formData);
//     form.value[item.value.field] = response.url;
//     loading?.close();
//   } catch (err) {
//     console.log(err);
//   }
// };
</script>

<style lang="scss" scoped></style>
