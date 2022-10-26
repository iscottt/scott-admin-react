import { createContext } from 'react';
import appStore from './modules/app';
import userStore from './modules/user';
import { Stores } from './types';

export const stores = Object.freeze<Stores>({
  appStore,
  userStore,
});

export const storeContext = createContext(stores);
export const StoresProvider = storeContext.Provider;
