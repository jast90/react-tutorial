import React,{Component} from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons'

  import './index.css'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu;

export class LeftNav extends Component{

    render(){
        return (
            <div>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <NavLink to='/home'>首页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <NavLink to='/product'>商品管理</NavLink>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }

}

export default withRouter(LeftNav)