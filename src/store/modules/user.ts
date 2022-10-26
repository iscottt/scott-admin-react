import { fetchLogin } from '@/service';
import { loginProps } from '@/types';
import { action, flow, makeObservable, observable } from 'mobx';
import { UserApi } from '@/service/interface';
import { setToken, setRefreshToken } from '@/utils';

class UserMobx {
  _self = this;
  constructor() {
    makeObservable(this);
  }
  @observable userInfo = {};

  // 登录获取到token
  @action
  async loginAction(loginUser: loginProps) {
    try {
      const result = await fetchLogin(loginUser);
      this.loginByToken(result.retData);
    } catch (error) {}
  }

  // 根据token获取用户信息
  @action
  async loginByToken(backendToken: UserApi.ResLogin) {
    // 先把token存储到缓存中
    const { token, refreshToken } = backendToken;
    setToken(token);
    setRefreshToken(refreshToken);
  }
}

export default new UserMobx();
