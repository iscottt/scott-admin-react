import { HttpUtil } from './httpUtil';
import { AxiosTransform } from './axiosTransform';
import qs from 'qs';
import { checkStatus } from './checkStatus';
import axios, { AxiosResponse } from 'axios';
import { RequestOptions, Result, ResultEnum } from './types';
import { message } from 'ant-design-vue';
import { getToken } from '@/utils';
import { downloadFile, isString, isObject } from './helper';

const transform: AxiosTransform = {
  // 请求前的一些处理
  beforeRequestHook: (config, options) => {
    const { apiUrl, isParseToJson, commonParams, isDownload } = options;
    // 设置请求地址，默认为 /api
    config.url = `${apiUrl}${config.url}`;

    if (config.method === 'GET') {
      const now = new Date().getTime();
      if (!isString(config.params)) {
        config.data = {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          params: Object.assign(config.params || {}, {
            _t: now,
          }),
        };
      } else {
        // 兼容restful风格
        config.url = config.url + config.params + `?_t=${now}`;
        config.params = {};
      }
    } else {
      if (!isString(config.params)) {
        config.data = config.params;
        config.params = {};
        // if (joinParamsToUrl) {
        //   config.url = setObjToUrlParams(config.url as string, config.data);
        // }
      } else {
        // 兼容restful风格 DELETE 等方法
        config.url = config.url + config.params;
        config.params = {};
      }
      // 设置公共参数
      if (commonParams && isObject(commonParams)) {
        config.data = Object.assign(config.data, commonParams);
      }
      // 'a[]=b&a[]=c'
      if (!isParseToJson) {
        config.params = qs.stringify(config.params, { arrayFormat: 'brackets' });
        config.data = qs.stringify(config.data, { arrayFormat: 'brackets' });
      }

      if (isDownload) {
        config.responseType = 'blob';
        message.loading('正在发起下载...', 0);
      }
    }
    return config;
  },
  // 处理请求数据
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const {
      isTransformRequestResult,
      successMessageText,
      errorMessageText,
      isDownload,
      isShowMessage = false,
    } = options;
    const reject = Promise.reject;
    const { data } = res;
    const { retCode, retData, retMessage } = data;
    const isSuccess = retCode === ResultEnum.SUCCESS;
    if (isShowMessage) {
      // 信息提示
      if (isSuccess && successMessageText) {
        // 是否显示自定义信息提示
        console.log(successMessageText || retMessage || '操作成功！');
      } else if (!isSuccess && errorMessageText) {
        // 是否显示自定义信息提示
        console.log(retMessage || errorMessageText || '操作失败！');
      } else if (!isSuccess && options.errorMessageMode === 'modal') {
        // errorMessageMode=modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
      }
    }

    // 不处理数据
    if (!isTransformRequestResult && retCode === ResultEnum.SUCCESS) {
      return res.data;
    }
    // 没有res.data表示接口请求失败
    if (!data) {
      return reject(data);
    }

    if (isDownload) {
      downloadFile(res).finally(() => message.destroy());
      return res;
    }
    // code
    switch (retCode) {
      // 接口请求成功，直接返回结果
      case ResultEnum.SUCCESS:
        return retData;
      case ResultEnum.FAIL:
        const msg = '操作失败,系统异常!';
        Promise.reject(new Error(msg));
        break;
      case ResultEnum.TIMEOUT:
        console.log('登录超时');
        break;
      default:
        if (retMessage) {
          message.error(retMessage);
          Promise.reject(new Error(retMessage));
        } else {
          const msg = '操作失败,系统异常!';
          Promise.reject(new Error(msg));
        }
        return data;
    }
    return data;
  },
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    if (config.headers) {
      // 设置token
      config.headers.Authorization = 'Bearer ' + getToken();
    }
    return config;
  },
  // 响应错误拦截器
  responseInterceptorsCatch: async (error: any) => {
    const { response, code, message } = error || {};
    const msg: string = response && response.data && response.data.error ? response.data.error.message : '';
    const err: string = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        console.log('接口请求超时,请刷新页面重试!');
        return;
      }
      if (err && err.includes('Network Error')) {
        // 网络异常
        console.log('网络异常,请检查你的网络连接');
        return;
      }
    } catch (error: any) {
      throw new Error(error);
    }

    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg);
    } else {
      console.warn(error, '请求被取消！');
    }
    return error;
  },
};

const httpUtil = new HttpUtil({
  timeout: 30 * 1000,
  withCredentials: true,
  transform,
  requestOptions: {
    // 需要对返回数据进行处理
    isTransformRequestResult: true,
    // 消息提示类型
    errorMessageMode: 'none',
    // 接口地址
    apiUrl: '/api',
  },
});

export default httpUtil;
