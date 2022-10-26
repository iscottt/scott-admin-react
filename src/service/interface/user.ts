export namespace UserApi {
  export interface ReqInsert {
    username: string;
    password: string;
    email: string;
    status: number | string;
    roleIds: string;
  }
  export interface ReqUpdate {
    id: number;
    username: string;
    password: string;
    email: string;
    status: number | string;
    roleIds: string;
  }
  export interface ResUser {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    status?: number | string;
    createTime?: string;
    updateTime?: string;
    roleIds?: string;
  }
}
