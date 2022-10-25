import React, { useContext } from 'react';
import { EnumDeviceType } from '@/enum';
import enquireJs from 'enquire.js';
import { useStore } from '@/store';

export const useDeviceEnquire = () => {
  const { AppMobx } = useStore();
  deviceEnquire((deviceType: EnumDeviceType) => {
    switch (deviceType) {
      case EnumDeviceType.desktop:
        AppMobx.setDeviceType(EnumDeviceType.desktop);
        break;
      case EnumDeviceType.tablet:
        AppMobx.setDeviceType(EnumDeviceType.tablet);
        break;
      case EnumDeviceType.mobile:
        AppMobx.setDeviceType(EnumDeviceType.mobile);
        break;
      default:
        AppMobx.setDeviceType(EnumDeviceType.desktop);
        break;
    }
  });
};

/**
 * 响应式检测
 * @param {*} callback
 */
export const deviceEnquire = function (callback: { (deviceType: EnumDeviceType): void; (arg0: EnumDeviceType): any }) {
  const matchDesktop = {
    match: () => {
      callback && callback(EnumDeviceType.desktop);
    },
  };

  const matchLablet = {
    match: () => {
      callback && callback(EnumDeviceType.tablet);
    },
  };

  const matchMobile = {
    match: () => {
      callback && callback(EnumDeviceType.mobile);
    },
  };

  enquireJs
    .register('screen and (max-width: 576px)', matchMobile)
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
    .register('screen and (min-width: 1200px)', matchDesktop);
};
