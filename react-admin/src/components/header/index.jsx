import React,{Component} from 'react'
import { Menu,Avatar,Dropdown,Modal} from 'antd';
import { UserOutlined,LogoutOutlined,SettingOutlined} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

import './index.css'
import storageUtils from '../../utils/storageUtils'

export class MyHeader extends Component{


    logout = () => { 
      Modal.confirm({
        content: "确认退出？",
        okText: '确认',
        cancelText: '取消',
        onOk: ()=>{
          storageUtils.removeUser()
          this.props.history.replace('/login')
        },
      })
    }
  

    render(){
        return (
            <div >
                <Dropdown overlay={()=>(
                  <Menu>
                    <Menu.Item>
                      <UserOutlined />个人中心
                    </Menu.Item>
                    <Menu.Item>
                      <SettingOutlined />个人设置
                    </Menu.Item>
                    <Menu.Item onClick={this.logout}>
                      <LogoutOutlined />退出登入
                    </Menu.Item>
                  </Menu>
                )} placement="bottomCenter">
                    <div className="user">
                        <Avatar icon={<UserOutlined />} />
                    </div>
                </Dropdown>
            </div>
        )
    }
}

export default withRouter(MyHeader)