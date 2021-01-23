import React from 'react'
import { Form, Col, Input, Space} from 'antd';

import {reqUserPage,reqUserAdd} from '../../../../api'

import SearchTable from '../../../../components/search-table'

const User = (props) =>{

    const columns = [
        {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName',
          fixed:"left",
        //   render: text => <a>{text}</a>,
        },
        {
            title: '名字',
            dataIndex: 'firstName',
            key: 'firstName',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '姓氏',
            dataIndex: 'lastName',
            key: 'lastName',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '电子邮件',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '用户来源',
          dataIndex: 'userFrom',
          key: 'userFrom',
        },
        
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (text, record) => (
            <Space size="middle">
              <a>角色</a>
            </Space>
          ),
        },
    ]
    const formFields = [
        (
            <Col span={8} key="userName">
                <Form.Item
                name='userName'
                label='用户名'
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入用户名!',
                //     },
                // ]}
                >
                <Input placeholder="请输入用户名" />
                </Form.Item>
            </Col>
        ),
        (
            <Col span={8} key="firstName">
                <Form.Item
                name='firstName'
                label='名字'
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入用户名!',
                //     },
                // ]}
                >
                <Input placeholder="请输入名字" />
                </Form.Item>
            </Col>
        ),
    ]

    const reqPage = reqUserPage

    const addFormItems = [
        (<Form.Item
            key="userName"
            name="userName"
            label="用户名"
            rules={[{
                required:true,
                message:'请输入用户名'
            }]}
        >
            <Input placeholder="用户名"></Input>
        </Form.Item>),
        (<Form.Item
            key="password"
            name="password"
            label="密码"
            rules={[{
                required:true,
                message:'请输入密码'
            }]}
        >
            <Input placeholder="用户名" type="password"></Input>
        </Form.Item>),
        (<Form.Item
            key="firstName"
            name="firstName"
            label="名字"
            rules={[{
                required:false,
                message:'请输入名字'
            }]}
        >
            <Input placeholder="名字" ></Input>
        </Form.Item>),
        (<Form.Item
            key="lastName"
            name="lastName"
            label="姓氏"
            rules={[{
                required:false,
                message:'请输入姓氏'
            }]}
        >
            <Input placeholder="姓氏" ></Input>
        </Form.Item>),
    ]

    return (
        <SearchTable 
        columns={columns}
        formFields={formFields}
        reqPage={reqPage}
        addFormItems={addFormItems}
        reqAdd={reqUserAdd}
        />
    )
}



export default User