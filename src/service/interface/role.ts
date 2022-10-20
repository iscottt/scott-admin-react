// 表格
export namespace RoleApi {
  export interface ReqInsert {
    menuIds: number;
    roleName: string;
    status: number;
    createTime: string;
    updateTime: string;
  }
  export interface ReqUpdate {
    id: number;
    menuIds: number;
    roleName: string;
    status: number;
    createTime: string;
    updateTime: string;
  }
}
