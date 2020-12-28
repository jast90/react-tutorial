import React,{Component,useState} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card,Select,Modal} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqAccountPage,reqPayWayList,reqAccountPayInfoAdd} from '../../api'

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
                <Col span={8} key="accountNo">
                    <Form.Item
                    name='accountNo'
                    label='账户号'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入订单号!',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入账户号" />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="accountType">
                    <Form.Item
                    name='accountType'
                    label='账户类型'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请选择账户类型',
                    //     },
                    // ]}
                    >
                        <Select defaultValue="merchant" style={{ width: 120 }}>
                            <Option value="merchant">商户</Option>
                            <Option value="user">用户</Option>
                            <Option value="partner">合作商</Option>
                        </Select>
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="userNo">
                    <Form.Item
                    name='userNo'
                    label='用户编号'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入用户编号',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入用户编号" />
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

export default class Account extends Component{
    
    state = {
        data: [],
        pagination:{
            current: 1,
            pageSize: 15
        },
        condition:{},
        loading: false,
        payInfoModalVisible: false,
        payWayList: [],
        currentDomain:{}
    }

    columns = [
        {
          title: '账户编号',
          dataIndex: 'accountNo',
          key: 'accountNo',
          fixed:"left",
        //   render: text => <a>{text}</a>,
        },
        {
            title: '用户编号',
            dataIndex: 'userNo',
            key: 'userNo',
            fixed:"left",
          //   render: text => <a>{text}</a>,
        },
        {
            title: '余额',
            dataIndex: 'balance',
            key: 'balance',
          //   render: text => <a>{text}</a>,
        },
        {
          title: 'unbalance',
          dataIndex: 'unbalance',
          key: 'unbalance',
        },
        {
          title: '安全金额',
          dataIndex: 'securityMoney',
          key: 'securityMoney',
        },
        {
          title: '账户状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: '总收入',
            dataIndex: 'totalIncome',
            key: 'totalIncome',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '总支出',
            dataIndex: 'totalExpend',
            key: 'totalExpend',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '今日收入',
            dataIndex: 'todayIncome',
            key: 'todayIncome',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '今日支出',
            dataIndex: 'todayExpend',
            key: 'todayExpend',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '账户类型',
            dataIndex: 'accountType',
            key: 'accountType',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '结算金额',
            dataIndex: 'settAmount',
            key: 'settAmount',
          //   render: text => <a>{text}</a>,
        },
        
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (text, record) => (
            <Space size="middle">
              <a onClick={()=>{
                  this.setState({payInfoModalVisible:true,currentDomain:record})
              }}>添加支付信息</a>
              <a>冻结</a>
            </Space>
          ),
        },
    ];

    addAccountPayInfo = (values)=>{
        const {accountNo} = this.state.currentDomain
        debugger
        reqAccountPayInfoAdd({accountNo:accountNo,...values})
    }
    
    componentDidMount(){
        this.getPage()
        reqPayWayList().then((data)=>{
            this.setState({payWayList:data.data})
        })
    }


    getPage = (paginationParam) =>{
        this.setState({ loading: true });
        const {condition} = this.state
        let pagination = paginationParam
        if(!pagination){
            pagination = this.state.pagination
        }
        const {current,pageSize} = pagination
        reqAccountPage(current,pageSize,condition).then(result=>{
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


    render(){
        const { data, pagination, loading,condition,payInfoModalVisible,payWayList} = this.state;
        return (
            <div>
                <AdvanceSearchForm 
                    onPage={(condition)=>{
                        this.setState({condition})
                        this.setState({pagination:{current:1}})
                        this.getPage()
                    }}
                />
                <Card style={{ marginTop: '16px' }} extra={<Button type="primary" onClick={()=>this.setAddVisible(true)}  shape="round">添加</Button>}>
                    <Table 
                        columns={this.columns} 
                        dataSource={data} 
                        pagination={pagination}
                        loading={loading}
                        onChange={this.handleTableChange}
                        scroll={{x:2000}}
                        />
                </Card>
                <AccountPayInfoModalForm 
                    title="添加账户支付信息"
                    visible={payInfoModalVisible}
                    onCancel={()=>{
                        this.setState({payInfoModalVisible:false})
                    }}
                    onOk={(values)=>{
                        debugger
                        this.addAccountPayInfo(values)
                        this.setState({payInfoModalVisible:false})
                    }}
                    payWayList={payWayList}
                />
            </div>
        )
    }
}

const AccountPayInfoModalForm = ({title,visible,onCancel,onOk,initialValues={},payWayList}) => {
    const [form] = Form.useForm()
    if(initialValues){
        form.setFieldsValue(initialValues)
    }

    const getOptions = ()=>{
        const options = []
        payWayList.forEach((element,index) => {
            options.push(<Option value={element.payWayCode}>{element.payWayName}</Option>)
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
                    name="appId"
                    label="appId"
                    rules={[{
                        required:true,
                        message:'请输入appId'
                    }]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    name="appSecret"
                    label="appSecret"
                    rules={[{
                        required:true,
                        message:'请输入appSecret'
                    }]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    name="merchantId"
                    label="商户编号"
                    rules={[{
                        required:true,
                        message:'请输入商户编号'
                    }]}
                >
                    <Input placeholder="商户编号（微信，支付宝等提供）"></Input>
                </Form.Item>
                
                <Form.Item
                    name="partnerKey"
                    label="partnerKey"
                    rules={[{
                        required:true,
                        message:'请输入partnerKey'
                    }]}
                >
                    <Input placeholder="请输入partnerKey"></Input>
                </Form.Item>
                <Form.Item
                    name="payWayCode"
                    label="支付方式"
                    rules={[{
                        required:true,
                        message:'请选择支付方式'
                    }]}
                >
                    <Select>
                        {
                            getOptions()
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
