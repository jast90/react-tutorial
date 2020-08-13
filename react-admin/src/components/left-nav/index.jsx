import React,{Component} from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import { Layout, Menu, Mentions } from 'antd'
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons'
import { Icon as LegacyIcon } from '@ant-design/compatible';

import {reqMenuList} from '../../api'
import './index.css'
import Item from 'antd/lib/list/Item'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu;

export class LeftNav extends Component{

    getMenuNodes = () => {
        const menus = reqMenuList()
        return this.getMenue(menus)
    }

    getMenue = (list)=>{
        return list.reduce((pre,menu)=>{
            if(menu.children){
                const subMenu = (<SubMenu 
                    key={menu.path}
                    title={menu.title}
                    >
                    
                    {
                        this.getMenue(menu.children)
                    }
                </SubMenu>)
                pre.push(subMenu)

            }else{
                const menuItem = (
                    <Menu.Item key={menu.path} >
                        <NavLink to={menu.path}>
                            {menu.title}
                        </NavLink>
                    </Menu.Item>
                )
                pre.push(menuItem)
            }
            return pre
        },[])
    }

    render(){
        return (
            <div>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {this.getMenuNodes()}
                </Menu>
            </div>
        )
    }

}

export default withRouter(LeftNav)