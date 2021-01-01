import React,{Component,useState} from 'react'
import { Select,Form, Row, Col, Input, Button,Table, Space,DatePicker,Card} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import SearchTabl from "../../components/search-table";
import {reqStorePage} from '../../api'

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
                <Col span={8} key="orderNo">
                    <Form.Item
                    name='storeName'
                    label='门店名称'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入订单号!',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入门店名称" />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="orderNo">
                    <Form.Item
                    name='address'
                    label='门店地址'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入订单号!',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入门店地址" />
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
          title: '编号',
          dataIndex: 'storeId',
          key: 'storeId',
        //   render: text => <a>{text}</a>,
        },
        {
            title: '门店名称',
            dataIndex: 'storeName',
            key: 'storeName',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '门店地址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '经度',
          dataIndex: 'longitude',
          key: 'longitude',
        },
        {
            title: '纬度',
            dataIndex: 'latitude',
            key: 'latitude',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a href="/store/goods">商品</a>
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
        reqStorePage(current,pageSize,condition).then(result=>{
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
