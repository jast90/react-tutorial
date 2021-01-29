import React,{useState,useEffect} from 'react'
import { Form, Col, Input, Row, Button,Table,Card,Modal,Select,Space,Popconfirm,message,TreeSelect} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

 /**
  * 修改此处
  */
import {reqResourcePage,reqResourceAdd,reqResourceDetail,reqResourceUpdate,reqResourceDelete,reqResourceAll} from '../../../../api'

const { Option } = Select;
const { Column} = Table;
const { SHOW_PARENT } = TreeSelect;


const Resource = (props) =>{
    
    /**
     * 修改此处
     */
    const [resourceTree,setResourceTree] = useState([])

    const columns = [
        {
          title: '名称',
          dataIndex: 'resource',
          key: 'resource',
          fixed:"left",
        //   render: text => <a>{text}</a>,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '排序',
            dataIndex: 'rank',
            key: 'rank',
          //   render: text => <a>{text}</a>,
        },
    ]

    const searchFormFields = [
        (
            <Col span={8} key="resource">
                <Form.Item
                key="resource"
                name='resource'
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
            <Col span={8} key="type">
                <Form.Item
                key="type"
                name='type'
                label='类型'
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入用户名!',
                //     },
                // ]}
                >
                <Input placeholder="请输入类型" />
                </Form.Item>
            </Col>
        ),
        (
            <Col span={8} key="rank">
                <Form.Item
                key="rank"
                name='rank'
                label='排序'
                // rules={[
                //     {
                //     required: true,
                //     message: '请输入用户名!',
                //     },
                // ]}
                >
                <Input placeholder="请输入排序" />
                </Form.Item>
            </Col>
        ),
    ]

    const onLoadResourceTree = ()=>{
        
    }

    const addFormFields = [
        (<Form.Item name="id" style={{ display: 'none' }}>
            <Input type="text" />
        </Form.Item>
        ),
        (<Form.Item
            key="parentId"
            name="parentId"
            label="父级"
        >
            <TreeSelect 
                multiple={false}
                placeholder={"请选择父级"}
                treeData={resourceTree}
                allowClear={true}
             />
        </Form.Item>),
        (<Form.Item
            key="resource"
            name="resource"
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
            key="type"
            name="type"
            label="类型"
            rules={[{
                required:true,
                message:'请输入类型'
            }]}
        >
            <Input placeholder="类型" ></Input>
        </Form.Item>),
        (<Form.Item
            key="icon"
            name="icon"
            label="图标"
            rules={[{
                required:false,
                message:'请输入图标'
            }]}
        >
            <Input placeholder="图标" ></Input>
        </Form.Item>),
        (<Form.Item
            key="rank"
            name="rank"
            label="排序"
            rules={[{
                required:false,
                message:'请输入排序'
            }]}
        >
            <Input placeholder="排序" ></Input>
        </Form.Item>),
    ]

    

    const requestPage = reqResourcePage
    const requestAdd = reqResourceAdd
    const requestDetail = reqResourceDetail
    const requestUpdate = reqResourceUpdate
    const requestDelete = reqResourceDelete

    
    const [expand,setExpand] = useState(false)
    const [addModalShow,setAddModalShow] = useState(false)
    const [updateModalShow,setUpdateModalShow] = useState(false)


    const onDelete = (id)=>{
        requestDelete({id:id}).then(result=>{
            if(result.code === 0){
                message.success("删除成功")
                getPage()
            }
        })
    }
    const onRequestTreeData = ()=>{
        reqResourceAll().then(result=>{
            setResourceTree(result.data)
        })   
    }
    const onAddModalShow = ()=>{
        onRequestTreeData()
        setAddModalShow(true)
    }

    const onEdit = (id) => {
        onRequestTreeData()
        requestDetail({id:id}).then(result=>{
            if(result.code === 0){
                updateForm.setFieldsValue(result.data)
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
                    <Button type="primary" onClick={onAddModalShow}  shape="round">添加</Button>}
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
                    {addFormFields}
                </Form>
            </Modal>
        </div>
    )
}



export default Resource