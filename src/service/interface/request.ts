export namespace HttpUtils {
  export interface ResData<T> {
    retData: T;
    retCode: number | string;
  }
}
// * 登录
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
    code?: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [propName: string]: any;
  }
}

export namespace TableApi {
  export interface ReqTable {
    current: number;
    pageSize: number;
  }
}
