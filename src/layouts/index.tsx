import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import SHeader from './components/SHeader';
import SiderBar from './components/SiderBar';
import './layout.less';

const { Content } = Layout;

// 菜单数据
const initialMenus = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'nav 1',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
  },
];

const SLayout: React.FC = () => {
  // 控制边栏展开与收缩
  const [collapsed, setCollapsed] = useState(false);
  const [menus] = useState(initialMenus);

  const collapsedChange = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="layout-container">
      <SiderBar collapsed={collapsed} menus={menus} />
      <Layout className="site-layout">
        <SHeader onChange={collapsedChange} />
        <Content className="layout-content">
          {/* 自动加载对应路由的组件 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SLayout;
