import { AppStore } from './modules/app';
import { UserStore } from './modules/user';

export interface Stores {
  appStore: AppStore;
  userStore: UserStore;
}
