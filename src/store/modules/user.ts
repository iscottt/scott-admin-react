import { fetchLogin } from '@/service';
import { UserApi } from '@/service/interface';
import { loginProps } from '@/types';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export interface UserStore {
  userInfo: UserApi.ResUser;
  loginAction: (loginUser: loginProps) => void;
}

const userStore = makeAutoObservable<UserStore>({
  userInfo: {},

  // 设置暗黑模式
  async loginAction(loginUser: loginProps): Promise<void> {
    // const result = await fetchLogin(loginUser);
    axios.post('http://localhost:7345/api/auth/getLoginUser', loginUser).then((result) => {
      console.log('result', result);
    });
  },
});

export default userStore;
