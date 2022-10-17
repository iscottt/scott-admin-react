import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import SHeader from './components/SHeader';
import SiderBar from './components/SiderBar';
import './styles/layout.less';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

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
  const [collapsed, setCollapsed] = useState(false);
  const [menus, setMenus] = useState(initialMenus);

  const collapsedChange = (collapsed: boolean) => {
    console.log('collapsed', collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Layout className="layout-container">
      <SiderBar collapsed={collapsed} menus={menus} />
      <Layout className="site-layout">
        <SHeader onChange={collapsedChange} />
        <Content className="layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SLayout;
