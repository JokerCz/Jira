import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里, 改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = {
    ...object,
  };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

// const debounce = (func, delay) => {
//     let timeout;
//     return (...param) => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(function() {
//             func(...param);
//         }, delay)
//     }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()

// debounce 原理讲解
// 0s ------------> 1s ------------> 2s ------------> ...
//  一定要理解： 这三个函数都是同步操作，所以他们都是在0~1s这个时间段内瞬间完成的；
//  log()#1  // timeout #1
//  log()#2  // 发现 timeout#1！取消之， 然后设置timeout#2
//  log()#3  // 发现 timeout#2！取消之， 然后设置timeout#3
//           // 所以， log()#3 结束后，就只剩timeout#3在独自等待了

export const useDebounce = (value, delay) => {
  const [DebouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return DebouncedValue;
};
