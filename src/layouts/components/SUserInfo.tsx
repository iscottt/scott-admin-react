import { DownOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import React from 'react';

const menuClick: MenuProps['onClick'] = ({ key }) => {
  console.log(key);
};

const menu = (
  <Menu
    onClick={menuClick}
    items={[
      {
        key: 'password',
        label: <span className="text-blue">修改密码</span>,
        icon: <EditOutlined />,
      },
      {
        key: 'logout',
        label: <span className="text-blue">退出登录</span>,
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

const SUserInfo: React.FC = () => (
  <Dropdown overlay={menu}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        spuer admin
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default SUserInfo;
