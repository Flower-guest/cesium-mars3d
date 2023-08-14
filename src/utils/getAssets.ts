/*
  获取静态图片
*/
export default function getAssets(url: string) {
  return new URL(`../assets/img/${url}`, import.meta.url).href;
}
