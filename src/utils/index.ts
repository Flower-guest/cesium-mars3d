import * as Cesium from "cesium";
const colorCache: string[] = []; // 存储已生成的颜色

export function randomRgbaColor(alphas?: number): string {
  let color: string;
  do {
    // 随机生成RGBA颜色
    const r: number = Math.floor(Math.random() * 254); // 随机生成256以内r值
    const g: number = Math.floor(Math.random() * 254); // 随机生成256以内g值
    const b: number = Math.floor(Math.random() * 254); // 随机生成256以内b值
    const alpha: number = alphas || Math.random(); // 随机生成1以内a值
    color = `rgba(${r},${g},${b},${alpha})`; // rgba(r,g,b,a)格式颜色
  } while (colorCache.includes(color)); // 检查是否生成过相同的颜色

  colorCache.push(color); // 将新生成的颜色添加到缓存数组中
  return color;
}

export function randomRgbaColorCesium(alphas?: number): string {
  let color: any;
  do {
    // 随机生成RGBA颜色
    const r: number = Math.floor(Math.random() * 254); // 随机生成256以内r值
    const g: number = Math.floor(Math.random() * 254); // 随机生成256以内g值
    const b: number = Math.floor(Math.random() * 254); // 随机生成256以内b值
    const alpha: number = alphas || Math.random(); // 随机生成1以内a值
    color = new Cesium.Color(r / 100, g / 100, b / 100); // rgb(r,g,b,a)格式颜色
    color = color.withAlpha(alpha);
  } while (colorCache.includes(color)); // 检查是否生成过相同的颜色
  colorCache.push(color); // 将新生成的颜色添加到缓存数组中
  return color;
}

export function rgbaColorCesium(...args: any): string {
  let color: any;
  const r =  args[0] / 100;
  const g = args[1] / 100;
  const b = args[2] / 100;
  color = new Cesium.Color(r,g, b);
  color = color.withAlpha(args[3] || 1);
  return color;
}
