import { fetchLogin } from '@/service';
import { loginProps } from '@/types';
import { flow, makeObservable, observable } from 'mobx';

class UserMobx {
  constructor() {
    makeObservable(this);
  }
  @observable userInfo = {};

  loginAction = flow(function* (loginUser: loginProps) {
    try {
      const result = yield fetchLogin(loginUser);
      console.log('result', result);
    } catch (error) {}
  }).bind(this);
}

export default new UserMobx();
