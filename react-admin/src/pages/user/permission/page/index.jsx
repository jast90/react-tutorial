import React,{useState} from 'react'
import { Form, Col, Input} from 'antd';

import {reqPermissionPage,reqPermissionAdd,reqPermissionDetail,reqPermissionUpdate,reqPermissionDelete} from '../../../../api'

import SearchTable from '../../../../components/search-table'

const Permission = (props) =>{
    
    const columns = [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          fixed:"left",
        //   render: text => <a>{text}</a>,
        },
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
          //   render: text => <a>{text}</a>,
        },
    ]
    const searchFormFields = [
        (
            <Col span={8} key="name">
                <Form.Item
                key="name"
                name='name'
                label='名称'
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入名称!',
                //     },
                // ]}
                >
                <Input placeholder="请输入名称" />
                </Form.Item>
            </Col>
        ),
        (
            <Col span={8} key="code">
                <Form.Item
                key="code"
                name='code'
                label='编码'
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入用户名!',
                //     },
                // ]}
                >
                <Input placeholder="请输入编码" />
                </Form.Item>
            </Col>
        ),
        (
            <Col span={8} key="description">
                <Form.Item
                key="description"
                name='description'
                label='描述'
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入用户名!',
                //     },
                // ]}
                >
                <Input placeholder="请输入描述" />
                </Form.Item>
            </Col>
        ),
    ]

    const addFormFields = [
        (<Form.Item name="id" style={{ display: 'none' }}>
            <Input type="text" />
        </Form.Item>
        ),
        (<Form.Item
            key="name"
            name="name"
            label="名称"
            rules={[{
                required:true,
                message:'请输入名称'
            }]}
        >
            <Input placeholder="名称"></Input>
        </Form.Item>),
        (<Form.Item
            key="code"
            name="code"
            label="编码"
            rules={[{
                required:true,
                message:'请输入编码'
            }]}
        >
            <Input placeholder="编码"></Input>
        </Form.Item>),
        (<Form.Item
            key="description"
            name="description"
            label="描述"
            rules={[{
                required:false,
                message:'请输入描述'
            }]}
        >
            <Input placeholder="描述" ></Input>
        </Form.Item>),
    ]

    return (
        <div>
            <SearchTable 
                columns={columns}
                searchFormFields={searchFormFields}
                addFormFields={addFormFields}
                editFormFields={addFormFields}
                requestPage={reqPermissionPage}
                requestAdd={reqPermissionAdd}
                requestUpdate={reqPermissionUpdate}
                requestDelete={reqPermissionDelete}     
                requestDetail={reqPermissionDetail}           
            />
        </div>
    )
}



export default Permission