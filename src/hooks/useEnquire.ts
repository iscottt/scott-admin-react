import React, { useContext } from 'react';
import { EnumDeviceType } from '@/enum';
import enquireJs from 'enquire.js';
import appStore from '@/store/modules/app';

export const useDeviceEnquire = () => {
  deviceEnquire((deviceType: EnumDeviceType) => {
    switch (deviceType) {
      case EnumDeviceType.desktop:
        appStore.setDeviceType(EnumDeviceType.desktop);
        break;
      case EnumDeviceType.tablet:
        appStore.setDeviceType(EnumDeviceType.tablet);
        break;
      case EnumDeviceType.mobile:
        appStore.setDeviceType(EnumDeviceType.mobile);
        break;
      default:
        appStore.setDeviceType(EnumDeviceType.desktop);
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