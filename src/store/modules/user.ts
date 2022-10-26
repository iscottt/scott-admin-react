import { fetchLogin, fetchUserInfo } from '@/service';
import { loginProps } from '@/types';
import { action, flow, makeObservable, observable } from 'mobx';
import { UserApi } from '@/service/interface';
import { setToken, setRefreshToken, setUserInfo, clearAuthStorage } from '@/utils';
import { notification } from 'antd';

class UserMobx {
  _self = this;
  constructor() {
    makeObservable(this);
  }
  @observable userInfo = {};
  @observable token = {};

  // 登录获取到token
  @action
  async loginAction(loginUser: loginProps) {
    try {
      const result = await fetchLogin(loginUser);
      this.loginByToken(result.retData);
    } catch (error) {}
  }

  // 重置token
  @action
  async resetAuthStore() {
    clearAuthStorage();
  }

  // 根据token获取用户信息
  @action
  async loginByToken(backendToken: UserApi.ResLogin) {
    // 先把token存储到缓存中
    const { token, refreshToken } = backendToken;
    setToken(token);
    setRefreshToken(refreshToken);
    // 获取用户信息
    const { retData } = await fetchUserInfo();
    if (retData) {
      // 成功后把用户信息存储到缓存中
      setUserInfo(retData);
      this.token = token;
      // 更新状态
      Object.assign(this, { userInfo: retData, backendToken });

      // 跳转登录后的地址
      // 登录成功弹出欢迎提示
      notification.success({
        message: '登录成功!',
        description: `欢迎回来，${retData.username}!`,
        duration: 3,
      });
    } else {
      // 不成功则重置状态
      this.resetAuthStore();
    }
  }
}

export default new UserMobx();
