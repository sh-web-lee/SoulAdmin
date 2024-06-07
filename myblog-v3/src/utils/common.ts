/**
 * Toggle html class
 *
 * @param className
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className);
  }
  function remove() {
    document.documentElement.classList.remove(className);
  }

  return {
    add,
    remove
  };
}

// 给一些数字转成k w
export function numberFormate(number: number) {
  let res: string;
  if (number >= 10000) {
    res = `${(number / 10000).toFixed(1)}w`;
  } else if (number >= 1000) {
    res = `${(number / 1000).toFixed(1)}k`;
  } else {
    res = number as unknown as string;
  }
  return res;
}

/**
 * 补0
 *
 * @param time
 * @returns
 */
export function addZero(time: number) {
  if (time > 0 && time < 10) {
    return `0${time}`;
  }
  return time;
}
