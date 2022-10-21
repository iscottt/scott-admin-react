import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Router from '@/router/index';
import { useDeviceEnquire } from './hooks';

const App = (props: any) => {
  useDeviceEnquire();
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;
