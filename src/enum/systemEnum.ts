/** 终端类型的名称 */
export enum EnumDeviceType {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}
/** 缓存的key */
export enum EnumStorageKey {
  /** 主题颜色 */
  'theme-color' = '__THEME_COLOR__',
  /** 用户token */
  'token' = '__TOKEN__',
  /** 用户刷新token */
  'refresh-token' = '__REFRESH_TOKEN__',
  /** 用户信息 */
  'user-info' = '__USER_INFO__',
  /** 多页签路由信息 */
  'tab-routes' = '__TAB_ROUTES__',
}
