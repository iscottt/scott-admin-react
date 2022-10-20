export namespace HttpUtils {
  export interface ReqData {
    retData: any;
    retCode: number | string;
  }
}
// * 登录
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
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
