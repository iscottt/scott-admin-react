import { DeviceType } from '@/types';
import { observable, action, makeObservable } from 'mobx';
class AppMobx {
  constructor() {
    // mobx6.0后的版本都需要手动调用makeObservable(this)，不然会发现数据变了视图不更新
    makeObservable(this);
  }
  @observable device = 'desktop';

  @action
  setDeviceType(device: DeviceType) {
    this.device = device;
  }
}
export default new AppMobx();
