import React,{Component,useState} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqAccountPayInfoPage} from '../../api'

const { RangePicker } = DatePicker;

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
                    label='账户编号'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入账户编号',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入账户编号" />
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
          dataIndex: 'accountNo',
          key: 'accountNo',
        //   render: text => <a>{text}</a>,
        },
        {
            title: '支付方式',
            dataIndex: 'payWayCode',
            key: 'payWayCode',
          //   render: text => <a>{text}</a>,
        },
        {
          title: 'appId',
          dataIndex: 'appId',
          key: 'appId',
        },
        {
          title: 'appSecret',
          dataIndex: 'appSecret',
          key: 'appSecret',
        },
        {
          title: '商户编号',
          dataIndex: 'merchantId',
          key: 'merchantId',
        },
        {
            title: 'appType',
            dataIndex: 'appType',
            key: 'appType',
          //   render: text => <a>{text}</a>,
        },
        {
            title: 'partnerKey',
            dataIndex: 'partnerKey',
            key: 'partnerKey',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>修改</a>
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
        reqAccountPayInfoPage(current,pageSize,condition).then(result=>{
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
