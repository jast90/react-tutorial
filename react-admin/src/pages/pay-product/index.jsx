import React,{Component,useState} from 'react'
import { Modal,Form, Row, Col, Input, Button,Table, Space,DatePicker,Switch, message,Card} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqPayProductList,reqAddPayProduct,reqUpdatePayProduct} from '../../api'

const ModalForm = ({title,visible,onCancel,onOk,initialValues={}}) => {
    const [form] = Form.useForm()
    if(initialValues){
        form.setFieldsValue(initialValues)
    }
    return(
        <Modal
            title={title}
            centered
            visible={visible}
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
                <Form.Item
                    name="productName"
                    label="支付产品名称"
                    rules={[{
                        required:true,
                        message:'请输入支付产品名称'
                    }]}
                >
                    <Input placeholder="支付产品名称"></Input>
                </Form.Item>
                <Form.Item
                    name="productCode"
                    label="支付产品编码"
                    rules={[{
                        required:true,
                        message:'请输入支付产品编码'
                    }]}
                >
                    <Input placeholder="支付产品编码"></Input>
                </Form.Item>
                <Form.Item
                    name="auditStatus"
                    label="审核状态"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch checked/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

const AdvanceSearchForm = ({onPage}) => {
    const [expand,setExpand] = useState(false)
    const [searchForm] = Form.useForm()
    const getFields = () => {
        //展开的输入框数量
        const count = 6;
        const children = [
            (
                <Col span={8} key="productCode">
                    <Form.Item
                    name='productCode'
                    label='支付产品编号'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入支付产品编号!',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入支付产品编号" />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="productName">
                    <Form.Item
                    name='productName'
                    label='支付产品名称'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入支付产品名称！',
                    //     },
                    // ]}
                    >
                        <Input placeholder="请输入支付产品名称" />
                    </Form.Item>
                </Col>
            ),
        ]
        return expand?children:children.slice(0,count);
    };

    const onFinish = values =>{
        onPage(values)
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

export default class PayProduct extends Component{

    state = {
        addVisible: false,
        updateVisible: false,
        data: [],
        pagination:{
            current: 1,
            pageSize: 15
        },
        condition:{},
        loading: false,
        currentPayProduct:{},
    }

    columns = [
        {
          title: '支付产品编号',
          dataIndex: 'productCode',
          key: 'productCode',
        //   render: text => <a>{text}</a>,
        },
        {
            title: '支付产品名称',
            dataIndex: 'productName',
            key: 'productName',
          //   render: text => <a>{text}</a>,
          },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '审核状态',
          dataIndex: 'auditStatus',
          key: 'auditStatus',
          render: text => <span>{text?"通过":"未审核"}</span>
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                
                <Space size="middle">
                  <a onClick={()=>{this.setUpdateVisible(true,record)}}>修改</a>
                </Space>
              ),
        },
    ]

    setAddVisible(addVisible){
        this.setState({addVisible})
    }

    setUpdateVisible(updateVisible,payProduct){
        this.setState({updateVisible})
        if(updateVisible){
            this.setState({currentPayProduct:payProduct})
        }else{
            this.setState({currentPayProduct:{}})
        }
    }

    

    getPage = (paginationParam) =>{
        this.setState({ loading: true });
        const {condition} = this.state
        let pagination = paginationParam
        if(!pagination){
            pagination = this.state.pagination
        }
        const {current,pageSize} = pagination
        reqPayProductList(current,pageSize,condition).then(result=>{
            this.setState({
                loading: false,
                data:result.data.content,
                pagination:{
                    current:current,
                    pageSize:pageSize,
                    total:result.data.total
                }
            })
        })
    }

    handleTableChange = (pagination)=>{
        this.getPage(pagination)
    }

    addPayProduct =  async (productName,productCode,auditStatus) => {
        const result = await reqAddPayProduct(productName,productCode,auditStatus)
        return result;
    }

    updatePayProduct = (values)=>{
        const payProduct = this.state.currentPayProduct
        const {id} = payProduct
        reqUpdatePayProduct({id,...values}).then((data)=>{
            if(data.code==0){
                this.setUpdateVisible(false)
                this.getPage()
            }else{
                message.error(data.msg)
            }
        })
    }

    componentDidMount(){
        this.getPage()   
    }


    render(){
        const { data, pagination, loading,condition,currentPayProduct} = this.state;
        return (
            <div>
                <AdvanceSearchForm 
                    onPage={(condition)=>{
                        this.setState({condition})
                        this.setState({pagination:{current:1}})
                        this.getPage()
                    }}
                />
                <Card style={{ marginTop: '16px' }} extra={<Button type="primary" onClick={()=>this.setAddVisible(true)}  shape="round">添加</Button>} >
                    <Table 
                    columns={this.columns} 
                    dataSource={data} 
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                    rowKey="id" 
                    />
                </Card>
                <ModalForm 
                    title="添加支付产品"
                    visible={this.state.addVisible} 
                    onCancel={()=>{this.setAddVisible(false)}} 
                    onOk={(values)=>{
                        this.addPayProduct(values.productName,values.productCode,values.auditStatus)
                        .then(data=>{
                            if(data.code != 0){
                                if(data.msg){
                                    message.error(data.msg)
                                }
                            }else{
                                this.setAddVisible(false)
                                this.getPage()
                            }
                        })
                    }}
                />
                <ModalForm 
                    title="修改支付产品"
                    visible={this.state.updateVisible} 
                    onCancel={()=>{
                        this.setUpdateVisible(false)
                        this.setState({currentPayProduct:{}})
                    }} 
                    onOk={(values)=>{
                        this.updatePayProduct(values)
                        this.setUpdateVisible(false)
                    }}
                    initialValues={currentPayProduct}
                />
            </div>
        )
    }
}