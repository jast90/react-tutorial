import React,{useState,useEffect} from 'react'
import { Form, Col, Input, Space, Row, Button,Table,Card,Modal,Select,Popconfirm,message} from 'antd';

import {reqUserPage,reqUserAdd,reqUserDetail,reqUserDelete,reqUserUpdate,reqRoleList} from '../../../../api'
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import SearchTable from '../../../../components/search-table'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


const User = (props) =>{
    const [roles,setRoles] = useState([])

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
    ]
    const searchFormFields = [
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

    const addFormFields = [
        (<Form.Item name="id" style={{ display: 'none' }}>
            <Input type="text" />
        </Form.Item>
        ),
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
        (<Form.Item
            key="roleIds"
            name="roleIds"
            label="角色"
            rules={[{
                required:true,
                message:'请输入用户名'
            }]}
        >
            <Select
                mode="multiple"
                placeholder="请选择角色"
            >
                {
                    roles.map(role=>
                        <Option value={role.id}>{role.name}</Option>
                    )
                }
            </Select>
        </Form.Item>),
    ]

    const editFormFields = [
        (<Form.Item name="id" style={{ display: 'none' }}>
            <Input type="text" />
        </Form.Item>
        ),
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
        (<Form.Item
            key="roleIds"
            name="roleIds"
            label="角色"
        >
            <Select
                mode="multiple"
                placeholder="请选择角色"
            >
                {
                    roles.map(role=><Option value={role.id}>{role.name}</Option>)
                }
            </Select>
        </Form.Item>),
    ]

    const requestRoles = () => {
        reqRoleList().then(result=>{
            if(result.code===0){
                setRoles(result.data)
            }
        })
    }



    const [expand,setExpand] = useState(false)
    const [addModalShow,setAddModalShow] = useState(false)
    const [updateModalShow,setUpdateModalShow] = useState(false)


    // 请求
    const requestPage = reqUserPage
    const requestAdd = reqUserAdd
    const requestUpdate = reqUserUpdate
    const requestDetail = reqUserDetail
    const requestDelete = reqUserDelete

     /**
     * 以下是固定不变的
     */

    //查询table的状态
    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({current: 1,pageSize: 15})
    const [condition,setCondition] = useState({})
    const [loading,setLoading] = useState(false)

    const [searchForm] = Form.useForm()
    const [addForm] = Form.useForm()
    const [updateForm] = Form.useForm()

    useEffect(() => {
        getPage()
      }, [])

      const onDelete = (id)=>{
        requestDelete({id:id}).then(result=>{
            if(result.code === 0){
                message.success("删除成功")
                getPage()
            }
        })
    }
    const onEdit = (id) => {
        requestDetail({id:id}).then(result=>{
            if(result.code === 0){
                updateForm.setFieldsValue(result.data)
                requestRoles()
                setUpdateModalShow(true)
            }
        })
    }

    const onUpdateOk = () => {
        updateForm.validateFields().then(values=>{
            requestUpdate(values).then(result => {
                if(result.code === 0){
                    setUpdateModalShow(false)
                    updateForm.resetFields();
                    onReload()
                }
            })
            
        })
        .catch(info => {
            // console.log('验证失败:', info);
        });
    }
    const onUpdateCancel = () => {
        updateForm.resetFields();
        setUpdateModalShow(false)
    }

    const onAddCancel = ()=>{
        addForm.resetFields();
        setAddModalShow(false)
    }
    const onAddOk = () => {
        addForm.validateFields().then(values=>{
            addForm.resetFields();
            requestAdd(values).then(result => {
                if(result.code === 0){
                    setAddModalShow(false)
                    onReload()
                }
            })
        })
        .catch(info => {
            // console.log('验证失败:', info);
        });
    }

    const getPage = (paginationParam) =>{
        setLoading(true)
        let myPagination = paginationParam
        if(!myPagination){
            myPagination = pagination
        }
        const {current,pageSize} = myPagination
        
        requestPage(current,pageSize,condition).then(result=>{
            setLoading(false)
            if(result.data){
                setData(result.data.content)
                setPagination({
                    current:current,
                    pageSize:pageSize,
                    total:result.data.total
                })
            }
        })
    }

    const onSearch = (values) => {
        setCondition({values})
        onReload()
    }

    const onReload = () =>{
        const {total,pageSize} = pagination
        getPage({
            current: 1,
            pageSize: pageSize,
            total: total
        })
    }

    



    return (
        <div>
            <Form
                form={searchForm}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onSearch}
                >
                <Row gutter={24}>{searchFormFields}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        htmlType="submit"
                        onClick={() => {
                            searchForm.resetFields()
                        }}
                    >
                        重置
                    </Button>
                    <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} {expand?"收起":"展开"}
                    </a>
                    </Col>
                </Row>
            </Form>
            <Card style={{ marginTop: '16px' }} 
                extra={
                    <Button type="primary" onClick={()=>{
                        setAddModalShow(true)
                        requestRoles()
                    }}  shape="round">添加</Button>}
                >
                <Table 
                    // columns={columns} 
                    dataSource={data} 
                    pagination={pagination}
                    loading={loading}
                    onChange={(values) => {
                        getPage(values)
                    }}
                    >
                    {
                        columns.map((column,index)=>{
                            return (
                                <Column title={column.title} dataIndex={column.dataIndex} key={column.key} fixed={column.fixed} render={column.render}/>
                            )
                        })
                    }
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <a onClick={()=>{
                                    onEdit(record.id)
                                }}>修改</a>
                                    <Popconfirm
                                        title="确定删除?"
                                        onConfirm={()=>{
                                            onDelete(record.id)
                                        }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <a href="#">删除</a>
                                    </Popconfirm>
                                </Space>
                        )}
                    />
                </Table>
            </Card>
            <Modal
                title="添加"
                centered
                visible={addModalShow}
                onOk={onAddOk}
                onCancel={ onAddCancel}
                okText="确定"
                cancelText="取消"
                forceRender
                >
                <Form
                    form={addForm}
                    labelCol={{span:6}}
                    wrapperCol={{span:14}}
                    // initialValues={initialValues}
                    preserve={false}
                    >
                    {addFormFields}
                </Form>
            </Modal>
            <Modal
                title="修改"
                centered
                visible={updateModalShow}
                onOk={onUpdateOk}
                onCancel={ onUpdateCancel}
                okText="确定"
                cancelText="取消"
                forceRender
                >
                <Form
                    form={updateForm}
                    labelCol={{span:6}}
                    wrapperCol={{span:14}}
                    preserve={false}
                    >
                    {editFormFields}
                </Form>
            </Modal>
        </div>
    )
}



export default User