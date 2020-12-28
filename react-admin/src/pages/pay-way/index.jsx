import React,{Component,useState} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card,Modal,Switch, Select,message} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqPayWayPage,reqAddPayWay,reqUpdatePayWay,reqPayProductList} from '../../api'

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdvanceSearchForm = ({onPage}) => {
    const [expand,setExpand] = useState(false)
    const [searchForm] = Form.useForm()
    const getFields = () => {
        //展开的输入框数量
        const count = 6;
        const children = [
            (
                <Col span={8} key="payWayCode">
                    <Form.Item
                    name='payWayCode'
                    label='支付方式编号'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入支付方式编号',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入支付方式编号" />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="payWayName">
                    <Form.Item
                    name='payWayName'
                    label='支付方式名称'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入支付方式名称',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入支付方式名称" />
                    </Form.Item>
                </Col>
            ),
        ]
        return expand?children:children.slice(0,count);
    }

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

export default class PayWay extends Component{
    
    state = {
        data: [],
        pagination:{
            current: 1,
            pageSize: 15
        },
        condition:{},
        loading: false,
        addVisible: false,
        updateVisible: false,
        currentDomain: {},
        payProductList: []
    }

    columns = [
        {
            title: '支付方式名称',
            dataIndex: 'payWayName',
            key: 'payWayName',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '支付方式编号',
            dataIndex: 'payWayCode',
            key: 'payWayCode',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '支付产品编号',
          dataIndex: 'payProductCode',
          key: 'payProductCode',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: '排序',
            dataIndex: 'sorts',
            key: 'sorts',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '商户支付费率',
            dataIndex: 'payRate',
            key: 'payRate',
          //   render: text => <a>{text}</a>,
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
    ];

    setAddVisible(addVisible){
        this.setState({addVisible})
    }

    setUpdateVisible(updateVisible,currentDomain){
        this.setState({updateVisible})
        if(updateVisible){
            this.setState({currentDomain:currentDomain})
        }else{
            this.setState({currentDomain:{}})
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
        reqPayWayPage(current,pageSize,condition).then(result=>{
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

    addPayProduct = (values) => {
        reqAddPayWay(values)
        .then((data)=>{
            if(data.code != 0){
                if(data.msg){
                    message.error(data.msg)
                }
            }else{
                this.setAddVisible(false)
                this.getPage()
            }
        })
        
    }

    updatePayProduct = (values)=>{
        const currentDomain = this.state.currentDomain
        const {id} = currentDomain
        reqUpdatePayWay({id,...values}).then((data)=>{
            if(data.code==0){
                this.setUpdateVisible(false)
                this.getPage()
            }else{
                message.error(data.msg)
            }
        })
    }

    handleTableChange = (pagination)=>{
        this.getPage(pagination)
        
        
    }

    componentDidMount(){
        this.getPage()
        reqPayProductList().then((data)=>{
            this.setState({payProductList:data.data})
        })
    }

    render(){
        const { data, pagination, loading,condition,addVisible,updateVisible,currentDomain,payProductList} = this.state;
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
                        />
                </Card>
                <ModalForm
                    title="添加支付产品"
                    visible={addVisible}
                    onCancel={()=>{
                        this.setAddVisible(false)
                    }}
                    onOk={(values)=>{
                        this.addPayProduct(values)
                    }}
                    payProductList={payProductList}
                >
                </ModalForm>
                <ModalForm
                    title="修改支付产品"
                    visible={updateVisible}
                    onCancel={()=>{
                        this.setUpdateVisible(false)
                    }}
                    onOk={(values)=>{
                        this.updatePayProduct(values)
                    }}
                    initialValues={currentDomain}
                    payProductList={payProductList}
                >
                </ModalForm>
            </div>
        )
    }
}

const ModalForm = ({title,visible,onCancel,onOk,initialValues={},payProductList}) => {
    const [form] = Form.useForm()
    if(initialValues){
        form.setFieldsValue(initialValues)
    }
    const getOptions = ()=>{
        const options = []
        payProductList.forEach((element,index) => {
            options.push(<Option value={element.productCode}>{element.productName}</Option>)
        })
        return options
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
                    name="payProductCode"
                    label="支付产品"
                    rules={[{
                        required:true,
                        message:'请选择支付产品'
                    }]}
                    initialValue="wechat"
                >
                    <Select defaultValue="wechat">
                        {
                            getOptions()
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="payWayName"
                    label="支付方式名称"
                    rules={[{
                        required:true,
                        message:'请输入支付方式名称'
                    }]}
                >
                    <Input placeholder="支付方式名称"></Input>
                </Form.Item>
                <Form.Item
                    name="payWayCode"
                    label="支付方式编码"
                    rules={[{
                        required:true,
                        message:'请输入支付方式编码'
                    }]}
                >
                    <Input placeholder="支付方式编码"></Input>
                </Form.Item>
                
                <Form.Item
                    name="payRate"
                    label="商户支付费率"
                    rules={[{
                        required:true,
                        message:'请输入商户支付费率'
                    }]}
                >
                    <Input placeholder="请输入支付方式名称"></Input>
                </Form.Item>
                <Form.Item
                    name="sorts"
                    label="排序"
                    rules={[{
                        required:true,
                        message:'请输入排序'
                    }]}
                >
                    <Input placeholder="请输入排序"></Input>
                </Form.Item>
            </Form>
        </Modal>
    )
}
