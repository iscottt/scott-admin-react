import { message } from 'antd';
import { AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getRefreshToken, setToken, setRefreshToken } from '@/utils';
import { fetchUpdateToken } from '../api';

/**
 * 下载文件
 * @param res
 * @returns
 */
export function downloadFile(res: AxiosResponse) {
  return new Promise((resolve, reject) => {
    console.log('res', res);
    const name = res.headers['content-disposition'];
    const fileName = name!.substring(name!.indexOf('=') + 1, name!.length);
    try {
      const blob = new Blob([res.data]);
      if ('download' in document.createElement('a')) {
        const isEXCLE = res.headers['content-type'] === 'application/msexcel;charset=UTF-8';
        if (!isEXCLE) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            message.error(JSON.parse(e.target.result).retMessage);
          };
          reader.readAsText(res.data);
        } else {
          const str = res.headers['content-disposition'];
          const name = str!.split('=')[1].split('.')[0];
          const fileType = str!.split('=')[1].split('.')[1];
          const elink: any = document.createElement('a');
          const blob = new Blob([res.data]);
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          elink.target = '_blank';
          elink.download = decodeURI(name) + '.' + fileType;
          elink.tableBorder = 1;
          document.body.appendChild(elink);
          elink.click();
          // 释放URL 对象
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        }
      } else {
        // IE10+下载
        (navigator as any).msSaveBlob(blob, fileName);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  // const { resetAuthStore } = useAuthStore();
  const refreshToken = getRefreshToken();
  const { retData } = await fetchUpdateToken(refreshToken);
  if (retData) {
    setToken(retData.token);
    setRefreshToken(retData.refreshToken);
    const config = { ...axiosConfig };
    if (config.headers) {
      config.headers.Authorization = 'Bearer ' + retData.token;
      config.url! += '?timestamps=' + new Date().getTime();
    }
    return config;
  }

  // resetAuthStore();
  return null;
}

const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function');
}
export function isNull(val: unknown): val is null {
  return val === null;
}
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}
/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction');
}
/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== 'undefined';
};

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === 'undefined';

// 是否为图片节点
export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName);
}
