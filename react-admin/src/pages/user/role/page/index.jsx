import React,{useState} from 'react'
import { Form, Col, Input, Space} from 'antd';

import {reqRolePage,reqRoleAdd,reqRoleDetail,reqRoleUpdate} from '../../../../api'

import SearchTable from '../../../../components/search-table'

const Role = (props) =>{
    const [addModalShow,setAddModalShow] = useState(false)
    const [updateModalShow,setUpdateModalShow] = useState(false)
    const [initValue,setInitValue] = useState({})
    
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
            dataIndex: 'role',
            key: 'role',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (text, record) => (
            <Space size="middle">
              <a >资源</a>
              <a onClick={()=>{
                  console.log(record.id)
                  reqRoleDetail({id:record.id}).then(result=>{
                    if(result.code === 0){
                        setInitValue(result.data)
                        console.log(initValue)
                        setUpdateModalShow(true)
                    }
                  })
              }}>修改</a>
            </Space>
          ),
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
            <Col span={8} key="role">
                <Form.Item
                key="role"
                name='role'
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
            key="role"
            name="role"
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
                requestPage={reqRolePage}
                addFormFields={addFormFields}
                requestAdd={reqRoleAdd}
                addModalShow={addModalShow}
                onShowAddModal={()=>{
                    setAddModalShow(true)
                }}
                onHideAddModal={()=>{
                    setAddModalShow(false)
                }}
                updateModalShow={updateModalShow}
                onHideUpdateModal={()=>{
                    setUpdateModalShow(false)
                }}
                requestUpdate={reqRoleUpdate}
                initValue={initValue}                
            />
        </div>
    )
}



export default Role