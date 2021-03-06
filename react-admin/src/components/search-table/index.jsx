import React,{useState,useEffect} from 'react'
import { Form, Row, Col, Button,Table,Card,Modal,Select,Space,Popconfirm,message} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Column, ColumnGroup } = Table;

const SearchTable = (props) =>{

    //查询table的props
    const columns = props.columns
    const searchFormFields = props.searchFormFields

    //添加弹窗的props
    const addFormFields = props.addFormFields
    const editFormFields = props.editFormFields

    // 请求
    const requestPage = props.requestPage
    const requestAdd = props.requestAdd
    const requestUpdate = props.requestUpdate
    const requestDetail = props.requestDetail
    const requestDelete = props.requestDetail



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
    const onEdit = (id) => {
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
                    <Button type="primary" onClick={()=>{
                        setAddModalShow(true)
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

export default SearchTable