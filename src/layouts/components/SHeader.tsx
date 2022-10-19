import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import SFullScreen from './SFullScreen';
import SUserInfo from './SUserInfo';
const { Header } = Layout;

export type SHeaderProps = {
  onChange: (value: boolean) => void;
};

const SHeader: React.FC<SHeaderProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  // 触发角点击事件，调用父组件的事件，将状态传递
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    props.onChange(!collapsed);
  };

  return (
    <Header className="layout-header">
      <div className="header-trigger">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => toggleCollapsed(),
        })}
      </div>
      <div className="header-action">
        <SFullScreen />
        <SUserInfo />
      </div>
    </Header>
  );
};

export default SHeader;
