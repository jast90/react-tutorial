import React,{Component,useState} from 'react'
import { Select,Form, Row, Col, Input, Button,Table, Space,DatePicker,Card} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqProfitSharingReceiverPage} from '../../api'

const { RangePicker } = DatePicker;
const {Option} = Select

const AdvanceSearchForm = ({onPage}) => {
    const [expand,setExpand] = useState(false)
    const [searchForm] = Form.useForm()
    const getFields = () => {
        //展开的输入框数量
        const count = 6;
        const children = [
            (
                <Col span={8} key="account">
                    <Form.Item
                    name='account'
                    label='分账接收方帐号'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入分账接收方帐号',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入分账接收方帐号" />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="name">
                    <Form.Item
                    name='name'
                    label='分账接收方全称'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入分账接收方全称',
                    //     },
                    // ]}
                    >
                        <Input placeholder="分账接收方全称" />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="type">
                    <Form.Item
                    name='type'
                    label='分账接收方类型'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请选择支付时间',
                    //     },
                    // ]}
                    >
                        <Select defaultValue="user" >
                            <Option value="user">用户</Option>
                        </Select>
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
          title: '分账接收方帐号',
          dataIndex: 'account',
          key: 'account',
        //   render: text => <a>{text}</a>,
        },
        {
            title: '分账接收方类型',
            dataIndex: 'type',
            key: 'type',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '分账接收方全称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '与分账方的关系类型',
          dataIndex: 'relationType',
          key: 'relationType',
        },
        {
          title: '自定义的分账关系',
          dataIndex: 'customRelation',
          key: 'customRelation',
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
        reqProfitSharingReceiverPage(current,pageSize,condition).then(result=>{
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
