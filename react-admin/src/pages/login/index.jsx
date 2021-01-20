import React,{ Component } from "react";
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import {Redirect, withRouter} from 'react-router-dom'

import './login.css'
import {reqLogin,reqAuthorities} from '../../api'
import storageUtils from '../../utils/storageUtils'

export class Login extends Component{

    login = async (param)=>{
        console.log(param)
        const {username,password} = param
        const result = await reqLogin(username,password)
        if(result){
            storageUtils.saveUser(result)
            //登入成功后权限
            const authorities = await reqAuthorities()
            console.log(authorities)
            storageUtils.saveUserAuthorities(authorities)
            this.props.history.replace('/')
        }
    
    }

    render(){
        const user = storageUtils.getUser()
        if(user){
            return <Redirect to='/'/>
        }
        return (
            <div>
                <div className="login-content">
                    <div className="login-box">
                        <div className="login-title">用户登入</div>
                        <LoginForm login={this.login}/>
                    </div>
                </div>
            </div>
        )
        
        
    }
}

class LoginForm extends Component{
    static propTypes = {
        login: PropTypes.func.isRequired
    }
    submitForm(values){
        console.log(values)
    }

    render(){
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.props.login}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: '请输入用户名!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    登入
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(Login)
