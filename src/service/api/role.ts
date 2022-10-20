import http from '../httpUtil';
import { RoleApi } from '../interface';
import { HttpUtils, TableApi } from '../interface/request';
const isDev = import.meta.env.DEV;
const apiUrl = isDev ? 'http://localhost:7345/api' : '/api';

/**
 * 分页获取角色
 * @param verifyToken
 */
export function getRoleByPage(params: TableApi.ReqTable) {
  return http.request(
    {
      url: '/role/page',
      method: 'POST',
      params,
    },
    {
      apiUrl,
      isTransformRequestResult: true,
    }
  );
}

/**
 * 更新角色
 * @param params
 * @returns
 */
export function updateRole(params: RoleApi.ReqUpdate) {
  return http.request(
    {
      url: '/role/update',
      method: 'PUT',
      params,
    },
    {
      apiUrl,
      isTransformRequestResult: true,
    }
  );
}

/**
 * 插入新角色
 * @param params
 * @returns
 */
export function insertRole(params: RoleApi.ReqInsert) {
  return http.request(
    {
      url: '/role/insert',
      method: 'POST',
      params,
    },
    {
      apiUrl,
      isTransformRequestResult: false,
      successMessageText: '操作成功',
    }
  );
}

/**
 * 删除角色
 * @param params
 * @returns
 */
export function deleteRole(id: string | number) {
  return http.request(
    {
      url: `/role/delete/${id}`,
      method: 'DELETE',
    },
    {
      apiUrl,
      isTransformRequestResult: false,
      successMessageText: '操作成功',
    }
  );
}
