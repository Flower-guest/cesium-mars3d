import Request from "./request";

const timeOut = 30000;
export const xjRequest = new Request({
  baseURL: import.meta.env.VITE_BASE_URL + "",
  timeout: timeOut,
  interceptors: {
    requestInterceptor: (config) => {
      const token = "";
      if (token) {
        config.headers = {
          Authorization: `bearer ${token}`,
        };
      }
      return config;
    },
  },
});
export const jsonRequest = new Request({
  baseURL: import.meta.env.VITE_BASE_JSON_URL + "",
  timeout: timeOut,
  interceptors: {
    requestInterceptor: (config) => {
      const token = "";
      if (token) {
        config.headers = {
          Authorization: `bearer ${token}`,
        };
      }
      return config;
    },
  },
});

// export default xjRequest;
