import React, { FC, useState } from 'react'
import { MailOutlined, ProjectOutlined } from "@ant-design/icons";
import { Menu } from "antd"
import { MenuProps } from "rc-menu";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


interface SideNavProps {
  onClick: (args: 'tickets' | 'users') => void
}

export const SideNav: FC<SideNavProps> = ({ onClick }) => {
  const [current, setCurrent] = useState('mail');
  const { state } = useLocation()
  const items: MenuProps['items'] = [
    getItem("Project dashboard", 'sub1', <ProjectOutlined />, [
      getItem(state.name, 'g1', null, [getItem('Tickets', 'tickets'), getItem('Users', 'users')], 'group'),
    ]),
  ]
  const onClickKey: MenuProps['onClick'] = (e) => {
    onClick(e.key as any)
  }
  return (
    <>
      <Menu
        onClick={onClickKey}
        defaultSelectedKeys={['']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={{
          height: '100vh',
          width: 256
        }}
        items={items}
      />
    </>
  )
}