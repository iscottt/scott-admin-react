import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosCanceler } from './axiosCancel';
import { CreateAxiosOptions, RequestOptions, Result } from './types';

import { cloneDeep } from 'lodash-es';
import { ResultEnum } from '@/enum';
import { handleRefreshToken, isFunction } from './helper';

export class HttpUtil {
  // axios实例
  private instance: AxiosInstance;
  private configForCreate: CreateAxiosOptions;
  constructor(config: CreateAxiosOptions) {
    // 初始化实例
    this.instance = axios.create(config);
    this.configForCreate = config;
    // 创建拦截器
    this.setupInterceptors();
  }
  // 获取实例
  getAxios(): AxiosInstance {
    return this.instance;
  }
  // 数据处理
  getTransform() {
    const { transform } = this.configForCreate;
    return transform;
  }
  // request 拦截器
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
      transform;
    const axiosCanceler = new AxiosCanceler();
    
    // 请求拦截器配置处理
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      // 是否需要取消请求
      const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config;
      !ignoreCancelToken && axiosCanceler.addPending(config);
      // 配置拦截器
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    }, undefined);

    // 请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.instance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应结果拦截器处理
    this.instance.interceptors.response.use(async (res: AxiosResponse<any>) => {
      // token过期
      if (res.data.retCode === ResultEnum.INVALID_TOKEN) {
        const config = await handleRefreshToken(res.config);
        if (config) {
          return this.instance.request(config);
        }
      }
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // 响应结果拦截器错误捕获
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.instance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  // 请求
  request<T = any>(config: AxiosRequestConfig, options: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.configForCreate;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // 请求是否被取消
          const isCancel = axios.isCancel(res);
          if (transformRequestData && isFunction(transformRequestData) && !isCancel) {
            const ret = transformRequestData(res, opt);
            // ret !== undefined ? resolve(ret) : reject(new Error('request error!'));
            return resolve(ret);
          }
          reject(res as unknown as Promise<T>);
        })
        .catch((e: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e));
            return;
          }
          reject(e);
        });
    });
  }
}
