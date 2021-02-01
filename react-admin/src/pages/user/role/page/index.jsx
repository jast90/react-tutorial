import React,{useState,useEffect} from 'react'
import { Drawer,Form, Col, Input, Row, Button,Table,Card,Modal,Select,Space,Popconfirm,message,TreeSelect} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {reqRolePage,reqRoleAdd,reqRoleDetail,reqRoleUpdate,reqRoleDelete,reqResourceAll,reqPermissionAll} from '../../../../api'

const { SHOW_PARENT } = TreeSelect;
const { Option } = Select;
const { Column, ColumnGroup } = Table;

const requestPage = reqRolePage
const requestAdd = reqRoleAdd
const requestDetail = reqRoleDetail
const requestUpdate = reqRoleUpdate
const requestDelete = reqRoleDelete

const Role = (props) =>{
    const [resourceTree,setResourceTree] = useState([])
    const [permissions,setPermissions] = useState([])
    const [resourcePermissions,setResourcePermissions] = useState([])
    const [selectedResources,setSelectedResources] = useState([])
    const [selectedPermissions,setSelectedPermissions] = useState([])
    const [addedResources,setAddedResources] = useState([])
    const [addedPermissions,setAddedPermissions] = useState([])
    const [addMap,setAddMap] = useState(new Map())
    const [add,setAdd] = useState(true)    

    const onAddResourcePermissions = (values)=>{
        addedResources.push(selectedResources)
        addedPermissions.push(selectedPermissions)

        selectedResources.forEach(selectedResource=>{
            if(addMap.get(selectedResource.id)){
                let temp = addMap.get(selectedResource.id).permissions
                let permissionIdSet = new Set()
                for(const permission of temp){
                    permissionIdSet.add(permission.id)
                }
                for(const item of selectedPermissions){
                    if(!permissionIdSet.has(item.value)){
                        addMap.get(selectedResource.id).permissions.push({id:item.value,name:item.children})
                    }
                }
            }else{
                let myPermissions = []
                for(const item of selectedPermissions){
                    console.log(item)
                    myPermissions.push({id:item.value,name:item.children})
                }
                addMap.set(selectedResource.id,{resource : selectedResource, permissions : myPermissions})
            }
        })
        
        updateResourcePermissions()

        addResourcePermissionForm.resetFields()
        setSelectedResources([])
        setSelectedPermissions([])
    }

    const updateResourcePermissions = () => {
        let list = [];
        let ps 
        for(const resourceId of addMap.keys()){
            const entity = addMap.get(resourceId);
            ps = "";
            for(const permission of entity.permissions){
                ps += permission.name + ","
            }
            list.push({resource:entity.resource.resource,id:entity.resource.id,permissions:ps})
        }
        setResourcePermissions(list)
    }

    const requestTreeData = ()=>{
        reqResourceAll().then(result=>{
            setResourceTree(result.data)
        })   
    }
    const requestPermissions = ()=>{
        reqPermissionAll().then(result=>{
            setPermissions(result.data)
        })   
    }

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

    const [expand,setExpand] = useState(false)
    const [addDrawerShow,setAddDrawerShow] = useState(false)

    const [searchForm] = Form.useForm()
    const [addBasicInfoForm] = Form.useForm()
    const [addResourcePermissionForm] = Form.useForm()

    const onDelete = (id)=>{
        requestDelete({id:id}).then(result=>{
            if(result.code === 0){
                message.success("删除成功")
                getPage()
            }
        })
    }
    const onEdit = (id) => {
        setAdd(false)
        requestDetail({id:id}).then(result=>{
            if(result.code === 0){
                // setUpdateModalShow(true)
                addBasicInfoForm.setFieldsValue(result.data.role)
                setAddDrawerShow(true)
                
                if(result.data.resourcePermissionVoList){
                    for(const item of result.data.resourcePermissionVoList){
                        if(item){
                            addMap.set(item.id,{resource : item, permissions : item.permissions})
                        }
                    }
                    updateResourcePermissions()
                }
            }
        })
    }


    /**
     * 以下是固定不变的
     */

    //查询table的状态
    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({current: 1,pageSize: 15})
    const [condition,setCondition] = useState({})
    const [loading,setLoading] = useState(false)



    useEffect(() => {
        getPage()
        requestTreeData()
        requestPermissions()
      }, [])

    const getPage = (paginationParam) => {
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

    
    const onHideDrawer = () => {
        setAddDrawerShow(false)
        setAddMap(new Map())
        setResourcePermissions([])
        setSelectedPermissions([])
        setSelectedResources([])
        addBasicInfoForm.resetFields()
        addResourcePermissionForm.resetFields()
    }

    const addOnFinish = (values) => {
        let resourcePermissionIds = []
        for(let resourceId of addMap.keys()){
            let permissionIds = []
            for(const permission of addMap.get(resourceId).permissions){
                permissionIds.push(permission.id)
            }
            resourcePermissionIds.push({resourceId : resourceId,permissionIds : permissionIds})
        }
        console.log(resourcePermissionIds)
        console.log(addMap)
        if(add){
            requestAdd({...values,list: resourcePermissionIds}).then(result =>{
                if(result.code === 0){
                    onHideDrawer()
                    onReload()
                    addBasicInfoForm.resetFields()
                }
            })
        }else{
            requestUpdate({...values,list: resourcePermissionIds}).then(result =>{
                if(result.code === 0){
                    onHideDrawer()
                    onReload()
                    addBasicInfoForm.resetFields()
                }
            })
        }
        
    }

    const deleteAddMap = (id)=>{
        addMap.delete(id)
        updateResourcePermissions()
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
                    <div>
                    <Button type="primary" onClick={()=>{
                        setAddDrawerShow(true)
                        setAdd(true)
                        }}  shape="round">添加</Button>
                    </div>
                    }
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
            <Drawer
                title={add?"创建角色":"修改角色"}
                width={720}
                onClose={onHideDrawer}
                visible={addDrawerShow}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                    style={{
                        textAlign: 'right',
                    }}
                    >
                    <Button onClick={onHideDrawer} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={()=>{
                        addBasicInfoForm.submit()
                    }} type="primary">
                        提交
                    </Button>
                    </div>
                }
                >
                    <Form
                        form={addBasicInfoForm}
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                        // initialValues={initialValues}
                        preserve={false}
                        onFinish={addOnFinish}
                        >
                        <Card title="基本信息" bordered={false} key="basic">
                        {addFormFields}
                        </Card>
                    </Form>
                    <Card title="授权信息" bordered={false} key="permission">
                        <Form
                            form={addResourcePermissionForm}
                            preserve={false}
                            onFinish={onAddResourcePermissions}
                            >
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label="资源"
                                        name="resourcesIds"
                                        rules={[
                                            {
                                              required: true,
                                              message: '请选择资源!',
                                            },
                                        ]}
                                        >
                                        <TreeSelect 
                                            multiple={false}
                                            placeholder={"请选择资源"}
                                            treeData={resourceTree}
                                            allowClear={true}
                                            multiple={true}
                                            treeCheckable={true}
                                            // showCheckedStrategy={SHOW_PARENT}
                                            onChange={(value, label, extra)=>{
                                                for(var i = selectedResources.length -1; i >= 0; i--){
                                                    if(value.indexOf(selectedResources[i].id)===-1){
                                                        selectedResources.splice(i,1)
                                                    }
                                                }
                                                console.log(selectedResources)
                                            }}
                                            onSelect={(value, node)=>{
                                                selectedResources.push(node)
                                                console.log(selectedResources)
                                            }}
                                        />
                                    </Form.Item>  
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label="权限"
                                        name="permissions"
                                        rules={[
                                            {
                                              required: true,
                                              message: '请选择权限!',
                                            },
                                        ]}
                                        >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            placeholder="请选择权限"
                                            onChange={(value,options)=>{
                                                setSelectedPermissions(options)
                                            }}
                                            >
                                            {
                                                permissions.map(permission=>{
                                                    return (<Option key={permission.id} value={permission.id}>{permission.name}</Option>)
                                                })
                                            }
                                        </Select>
                                    </Form.Item> 
                                </Col>
                                <Col span={4}>
                                    <Button type="primary" htmlType="submit">
                                        添加
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Table columns={[
                                {
                                    title: '资源',
                                    dataIndex: 'resource',
                                    key: 'resource',
                                },
                                {
                                    title: '权限',
                                    dataIndex: 'permissions',
                                    key: 'permissions',
                                },
                                {
                                    title: '操作',
                                    dataIndex: 'actions',
                                    key: 'actions',
                                    render: (text,record) => <a onClick={()=>{
                                        deleteAddMap(record.id)
                                    }}>删除</a>,
                                }]} 
                                dataSource={resourcePermissions} />
                    </Card>
                </Drawer>
        </div>
    )
}



export default Role