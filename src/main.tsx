import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 导入windicss
import 'antd/dist/antd.less';
import 'virtual:windi.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
