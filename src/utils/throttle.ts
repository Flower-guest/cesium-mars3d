export function throttle<F extends (...args: any[]) => void>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let isThrottled = false;

  return function throttled(...args: Parameters<F>): void {
    if (!isThrottled) {
      func(...args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, wait);
    }
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay = 500 // 默认延时时间为 300 毫秒
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function debounced(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
