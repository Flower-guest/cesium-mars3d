class localCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(value);
  }
  setEncryption(key: string, value: any) {
    window.localStorage.setItem(key, btoa(JSON.stringify(value)));
  }
  getEncryption(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(atob(value));
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }
}

export default new localCache();
