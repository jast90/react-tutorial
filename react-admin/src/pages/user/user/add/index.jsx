import React,{Component,useState} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card,Select,Modal} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqUserAdd} from '../../../../api'

export default function UserAdd(props){
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 10 },
    }

    const onFinish = async (values)=>{
        console.log(values)
        const result = await reqUserAdd({...values})
        if(result.code === 0){
            props.history.replace('/user/page')
        }
    }
    return (
        <Form
            {... layout}
            form={form}
            name="UserAdd"
            onFinish={onFinish}
            >
              <Form.Item
                    name="userName"
                    label="用户名"
                    rules={[{
                        required:true,
                        message:'请输入用户名'
                    }]}
                >
                    <Input placeholder="用户名"></Input>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[{
                        required:true,
                        message:'请输入密码'
                    }]}
                >
                  <Input placeholder="用户名" type="password"></Input>
                </Form.Item>
                <Form.Item
                    name="firstName"
                    label="名字"
                    rules={[{
                        required:false,
                        message:'请输入名字'
                    }]}
                >
                  <Input placeholder="名字" ></Input>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="姓氏"
                    rules={[{
                        required:false,
                        message:'请输入姓氏'
                    }]}
                >
                  <Input placeholder="姓氏" ></Input>
                </Form.Item>
                <Form.Item {... tailLayout}>
                    <Button type="primary" htmlType="submit">
                    提交
                    </Button>
              </Form.Item>
          </Form>
    )
}