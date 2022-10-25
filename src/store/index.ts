import { createContext, useContext } from 'react';
import AppMobx from './modules/app';
import UserMobx from './modules/user';

const store = {
  AppMobx,
  UserMobx,
};

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export default store;
