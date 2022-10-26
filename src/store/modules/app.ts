import { DeviceType } from '@/types';
import { makeAutoObservable } from 'mobx';

export interface AppStore {
  device: DeviceType;
  setDeviceType: (device: DeviceType) => void;
}

const appStore = makeAutoObservable<AppStore>({
  device: 'desktop',

  // 设置暗黑模式
  setDeviceType(device: DeviceType): void {
    this.device = device;
  },
});

export default appStore;
