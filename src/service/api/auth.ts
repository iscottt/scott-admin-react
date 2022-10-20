import http from '../httpUtil';
const isDev = import.meta.env.DEV;
const apiUrl = isDev ? 'http://localhost:7345/api' : '/api';

/**
 * 登录
 * @param username
 * @param password
 * @returns
 */
export function fetchLogin(username: string, password: string) {
  return http.request(
    {
      url: '/auth/login',
      method: 'POST',
      params: { username, password },
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return http.request(
    {
      url: '/auth/getLoginUser',
      method: 'GET',
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return http.request(
    {
      url: '/menu/getRoutes',
      method: 'POST',
      params: { userId },
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/**
 * 刷新token
 * @param verifyToken
 */
export function fetchUpdateToken(verifyToken: string) {
  return http.request(
    {
      url: '/auth/refreshToken',
      method: 'POST',
      params: { verifyToken },
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}

/**
 * 获取菜单树
 * @returns
 */
export function getRouteTree() {
  return http.request(
    {
      url: '/menu/getMenuTree',
      method: 'GET',
    },
    {
      apiUrl,
      isTransformRequestResult: false,
    }
  );
}
