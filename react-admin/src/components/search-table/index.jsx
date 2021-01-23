import React,{useState,useEffect} from 'react'
import { Form, Row, Col, Button,Table,Card,Modal,Select,Input} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { Option } = Select;

const AdvanceSearchForm = (props) => {
    const [expand,setExpand] = useState(false)
    const [searchForm] = Form.useForm()
    const getFields = () => {
        //展开的输入框数量
        const count = 6;
        const children = props.formFields
        return expand?children:children.slice(0,count);
    }

    const onFinish = values =>{
        props.onPage(values)
    }

    return (
        <Form
            form={searchForm}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
            >
            <Row gutter={24}>{getFields()}</Row>
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
    )
}

const SearchTable = (props) =>{

    //查询table的props
    const columns = props.columns
    const formFields = props.formFields
    const reqPage = props.reqPage

    //添加弹窗的props
    const addFormItems = props.addFormItems
    const reqAdd = props.reqAdd

    //查询table的状态
    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({current: 1,pageSize: 15})
    const [condition,setCondition] = useState({})
    const [loading,setLoading] = useState(false)

    //添加弹窗的状态
    const [addModalShow,setAddModalShow] = useState(false)


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
        
        reqPage(current,pageSize,condition).then(result=>{
            setLoading(false)
            setData(result.data.content)
            setPagination({
                current:current,
                pageSize:pageSize,
                total:result.data.total
            })
        })
    }

    const handleTableChange = (values)=>{
        getPage(values)
    }


    return (
        <div>
            <AdvanceSearchForm 
                onPage={(values)=>{
                    setCondition({values})
                    const {total,pageSize} = pagination
                    getPage({
                        current: 1,
                        pageSize: pageSize,
                        total: total
                    })
                }}
                formFields={formFields}
            />
            <Card style={{ marginTop: '16px' }} 
                extra={
                    <Button type="primary" onClick={()=>setAddModalShow(true)}  shape="round">添加</Button>}
                >
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    />
            </Card>
            <AddModalForm 
                title="添加"
                show={addModalShow}
                onCancel={()=>{
                    setAddModalShow(false)
                }}
                onOk={(values)=>{
                    reqAdd(values).then(result => {
                        if(result.code === 0){
                            setAddModalShow(false)
                            const {total,pageSize} = pagination
                            getPage({
                                current: 1,
                                pageSize: pageSize,
                                total: total
                            })
                        }
                    })
                }}
                formItems={addFormItems}
                
            />
        </div>
    )
}

const AddModalForm = ({title,show,onCancel,onOk,formItems,reload}) => {
    const [form] = Form.useForm()

    return(
        <Modal
            title={title}
            centered
            visible={show}
            onOk={() => {
                form.validateFields().then(values=>{
                    onOk(values)
                    form.resetFields();
                })
                .catch(info => {
                    // console.log('验证失败:', info);
                });
            }}
            onCancel={ ()=>{
                onCancel()
                form.resetFields();
            }}
            okText="确定"
            cancelText="取消"
            forceRender
            >
            <Form
                form={form}
                labelCol={{span:6}}
                wrapperCol={{span:14}}
                // initialValues={initialValues}
                preserve={false}
                >
                {formItems}
            </Form>
        </Modal>
    )
}


const UpdateModalForm = ({title,show,onCancel,onOk,formItems,reload}) => {
    const [form] = Form.useForm()

    return(
        <Modal
            title={title}
            centered
            visible={show}
            onOk={() => {
                form.validateFields().then(values=>{
                    onOk(values)
                    form.resetFields();
                })
                .catch(info => {
                    // console.log('验证失败:', info);
                });
            }}
            onCancel={ ()=>{
                onCancel()
                form.resetFields();
            }}
            okText="确定"
            cancelText="取消"
            forceRender
            >
            <Form
                form={form}
                labelCol={{span:6}}
                wrapperCol={{span:14}}
                // initialValues={initialValues}
                preserve={false}
                >
                {formItems}
            </Form>
        </Modal>
    )
}

export default SearchTable