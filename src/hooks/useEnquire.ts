import React, { useContext } from 'react';
import { EnumDeviceType } from '@/enum';
import enquireJs from 'enquire.js';
import appStore from '@/store';

export const useDeviceEnquire = () => {
  const store = useContext(appStore);
  deviceEnquire((deviceType: EnumDeviceType) => {
    switch (deviceType) {
      case EnumDeviceType.desktop:
        store.setDeviceType(EnumDeviceType.desktop);
        break;
      case EnumDeviceType.tablet:
        store.setDeviceType(EnumDeviceType.tablet);
        break;
      case EnumDeviceType.mobile:
        store.setDeviceType(EnumDeviceType.mobile);
        break;
      default:
        store.setDeviceType(EnumDeviceType.desktop);
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
