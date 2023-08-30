<template>
  <div class="login-container">
    <img class="logo" src="../../../assets/img/logo.png" />
    <div class="login-card">
      <div class="title">用户登录</div>
      <div class="content">
        <el-form
          :hide-required-asterisk="true"
          :label-position="'top'"
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginFormRules"
          @keyup.enter="handleLogin"
        >
          <el-form-item prop="username" label="账号">
            <el-input
              v-model.trim="loginFormData.username"
              type="text"
              tabindex="1"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              v-model.trim="loginFormData.password"
              type="password"
              tabindex="2"
              size="large"
              show-password
            />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            @click.prevent="handleLogin"
            >登 录</el-button
          >
        </el-form>
        <div class="remember">
          <el-checkbox
            v-model="loginFormData.remember"
            label="记住密码"
            size="large"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { type FormInstance, FormRules } from "element-plus";
import LocalCache from "@/utils/cache";

const router = useRouter();
const store = useUserStore();

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null);

/** 登录按钮 Loading */
const loading = ref(false);

/** 登录表单数据 */
const loginFormData: any = reactive({
  username: "",
  password: "",
  remember: false, //记住密码
});

/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

// 密码回显
const initLoginFormData = () => {
  const res = LocalCache.getEncryption("userInfo") || null;
  if (res && res.remember) {
    loginFormData.username = res.username;
    loginFormData.password = res.password;
    loginFormData.remember = res.remember
  }
};
initLoginFormData();

/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true;
      store
        .login(loginFormData)
        .then(() => {
          router.push({ path: "/wholeIndex" });
        })
        .catch(() => {
          loginFormData.password = "";
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      console.error("表单校验不通过", fields);
    }
  });
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: url("../../../assets/img/login-bg.png") no-repeat;
  background-size: 100% 100%;

  .logo {
    width: 300px;
    height: 64px;
    margin-bottom: 81px;
  }
  .login-card {
    width: 520px;
    height: 500px;
    box-sizing: border-box;
    border-radius: 20px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(19px) brightness(120%);
    -webkit-backdrop-filter: blur(19px) brightness(120%);
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 34px;
      margin-top: 48px;
      color: #fff;
    }
    :deep(.content) {
      padding: 52px 57px 44px;
      .el-form-item__label {
        color: #cccccc;
        font-size: 17px;
      }
      .el-input__wrapper {
        padding: 0 8px 0 0;
        box-shadow: 0 0 0px 0px
          var(--el-input-border-color, var(--el-border-color)) inset;
        border-bottom: 1px solid #fff;
        border-radius: 0;
        cursor: default;
        background-color: transparent;
        font-size: 28px;
        .el-input__inner {
          color: #fff;
          cursor: default !important;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
        background: linear-gradient(270deg, #24929e 0%, #36a9b3 100%);
        border: 1px solid #2ebdcc;
      }
      .el-checkbox {
        margin-top: 21px;
        .el-checkbox__input {
          border: 1px solid #2ebdcc;
          .el-checkbox__inner {
            background-color: transparent;
            border: none;
          }
          .el-checkbox__inner::after {
            left: 5px;
            top: 0px;
            height: 10px;
            border-color: #2ebdcc;
          }
        }
        .el-checkbox__label {
          font-size: 18px;
          color: #2ebdcc;
        }
      }
    }
  }
}
</style>
