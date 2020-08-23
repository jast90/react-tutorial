import React,{Component,useState} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card,Select} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqAccountPage} from '../../api'

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
    }

    columns = [
        {
          title: '账户编号',
          dataIndex: 'accounNo',
          key: 'accounNo',
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
            title: '用户编号',
            dataIndex: 'userNo',
            key: 'userNo',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>详情</a>
            </Space>
          ),
        },
    ];


    
    componentWillMount(){
        this.getPage()
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
        const { data, pagination, loading,condition} = this.state;
        return (
            <div>
                <AdvanceSearchForm 
                    onPage={(condition)=>{
                        this.setState({condition})
                        this.setState({pagination:{current:1}})
                        this.getPage()
                    }}
                />
                <Card style={{ marginTop: '16px' }} >
                    <Table 
                        columns={this.columns} 
                        dataSource={data} 
                        pagination={pagination}
                        loading={loading}
                        onChange={this.handleTableChange}
                        />
                </Card>
            </div>
        )
    }
}
