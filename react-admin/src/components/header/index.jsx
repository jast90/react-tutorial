import React,{Component} from 'react'
import { Menu,Avatar,Dropdown } from 'antd';
import { UserOutlined,LogoutOutlined,SettingOutlined} from '@ant-design/icons'

import './index.css'

const menu = (
    <Menu>
      <Menu.Item>
        <UserOutlined />个人中心
      </Menu.Item>
      <Menu.Item>
        <SettingOutlined />个人设置
      </Menu.Item>
      <Menu.Item>
        <LogoutOutlined />退出登入
      </Menu.Item>
    </Menu>
  );

export default class MyHeader extends Component{

    render(){
        return (
            <div >
                <Dropdown overlay={menu} placement="bottomCenter">
                    <div className="user">
                        <Avatar icon={<UserOutlined />} />
                    </div>
                </Dropdown>
            </div>
        )
    }

}