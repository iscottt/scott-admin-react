import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
const { Sider } = Layout;

interface LayoutSiderProps {
  collapsed: boolean;
  menus: ItemType[];
}

const SiderBar: React.FC<LayoutSiderProps> = (props) => {
  const { collapsed, menus } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menus} />
    </Sider>
  );
};
export default SiderBar;
