import React,{useState,useEffect} from 'react'
import { Form, Row, Col, Button,Table,Card,Modal,Select,Space} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Column, ColumnGroup } = Table;

const SearchTable = (props) =>{
    const [expand,setExpand] = useState(false)
    const [searchForm] = Form.useForm()
    const [addForm] = Form.useForm()
    const [updateForm] = Form.useForm()

    //查询table的props
    const columns = props.columns
    const searchFormFields = props.searchFormFields
    const requestPage = props.requestPage
    const requestUpdate = props.requestUpdate
    const initValue = props.initValue

    //添加弹窗的props
    const editFormFields = props.addFormFields
    const requestAdd = props.requestAdd

    const addModalShow = props.addModalShow
    const updateModalShow = props.updateModalShow
    const onShowAddModal = props.onShowAddModal
    const onHideAddModal = props.onHideAddModal
    const onHideUpdateModal = props.onHideUpdateModal

    //查询table的状态
    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({current: 1,pageSize: 15})
    const [condition,setCondition] = useState({})
    const [loading,setLoading] = useState(false)

    if(initValue){
        updateForm.setFieldsValue(initValue)
    }

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
            setData(result.data.content)
            setPagination({
                current:current,
                pageSize:pageSize,
                total:result.data.total
            })
        })
    }

    const handleTableChange = (values) => {
        getPage(values)
    }

    const onSearch = (values) => {
        setCondition({values})
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
                    <Button type="primary" onClick={onShowAddModal}  shape="round">添加</Button>}
                >
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    />
            </Card>
            <Modal
                title="添加"
                centered
                visible={addModalShow}
                onOk={() => {
                    addForm.validateFields().then(values=>{
                        addForm.resetFields();
                        requestAdd(values).then(result => {
                            if(result.code === 0){
                                onHideAddModal()
                                const {total,pageSize} = pagination
                                getPage({
                                    current: 1,
                                    pageSize: pageSize,
                                    total: total
                                })
                            }
                        })
                    })
                    .catch(info => {
                        // console.log('验证失败:', info);
                    });
                }}
                onCancel={ ()=>{
                    addForm.resetFields();
                    onHideAddModal()
                }}
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
                    {editFormFields}
                </Form>
            </Modal>
            <Modal
                title="修改"
                centered
                visible={updateModalShow}
                onOk={() => {
                    updateForm.validateFields().then(values=>{
                        requestUpdate(values).then(result => {
                            if(result.code === 0){
                                onHideUpdateModal()
                                updateForm.resetFields();
                                const {total,pageSize} = pagination
                                getPage({
                                    current: 1,
                                    pageSize: pageSize,
                                    total: total
                                })

                            }
                        })
                        
                    })
                    .catch(info => {
                        // console.log('验证失败:', info);
                    });
                }}
                onCancel={ ()=>{
                    updateForm.resetFields();
                    onHideUpdateModal()
                }}
                okText="确定"
                cancelText="取消"
                forceRender
                >
                <Form
                    form={updateForm}
                    labelCol={{span:6}}
                    wrapperCol={{span:14}}
                    // initialValues={initValue}
                    preserve={false}
                    >
                    {editFormFields}
                </Form>
            </Modal>
        </div>
    )
}


export default SearchTable