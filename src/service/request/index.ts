import axios from "axios";
import type { AxiosInstance } from "axios";
import { XJRequestInterceptors, RequestConfig } from "./type";
import { ElLoading, ElMessage } from "element-plus";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";

const DEFAULT_LOADING = true; //loading默认状态

class Request {
  instance: AxiosInstance;
  interceptors?: XJRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance; //是否有loading实例

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.interceptors = config.interceptors;

    // 实例独有的请求响应拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 全局请求响应拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在加载中....",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const data = res.data;
        return data.data || data;
      },
      (err) => {
        this.loading?.close();
        ElMessage.error(err?.response?.data || "网络超时");
        return err;
      }
    );
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 请求独有的请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 独有的请求加载
      this.showLoading = config.showLoading ?? DEFAULT_LOADING;

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 独有的响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
}

export default Request;
