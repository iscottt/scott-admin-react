import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform';

// 请求结果定义
export interface Result<T = any> {
  retCode: number;
  retMessage: string;
  retData: T;
}

// 请求参数定义
export interface RequestOptions<T = any> {
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string;
  // 是否解析成JSON
  isParseToJson?: boolean;
  // 是否展示message
  isShowMessage?: boolean;
  // 消息成功提示
  successMessageText?: string;
  // 错误的文本信息
  errorMessageText?: string;
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal';
  // 是否为下载文件
  isDownload?: boolean;
  //  是否处理请求结果
  isTransformRequestResult?: boolean;
  // 是否需要token
  commonParams?: T;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

/**
 * @description: 请求结果集
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  FAIL = 500,
  TIMEOUT = 401,
  TYPE = 'success',
  INVALID_TOKEN = 60100,
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
