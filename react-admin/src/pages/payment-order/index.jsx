import React,{Component} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker} from 'antd';

import {reqOrderList} from '../../api'

const { RangePicker } = DatePicker;

export default class Account extends Component{
 
    getFields = () => {
        const children = [
            (
                <Col span={8} key="orderNo">
                    <Form.Item
                    name='orderNo'
                    label='订单号'
                    rules={[
                        {
                        required: true,
                        message: '请输入订单号!',
                        },
                    ]}
                    >
                    <Input placeholder="请输入订单号" />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="orderTime">
                    <Form.Item
                    name='orderTime'
                    label='下单时间'
                    rules={[
                        {
                        required: true,
                        message: '请选择下单时间',
                        },
                    ]}
                    >
                        <RangePicker />
                    </Form.Item>
                </Col>
            ),
            (
                <Col span={8} key="payTime">
                    <Form.Item
                    name='payTime'
                    label='支付时间'
                    rules={[
                        {
                        required: true,
                        message: '请选择支付时间',
                        },
                    ]}
                    >
                    <RangePicker />
                    </Form.Item>
                </Col>
            ),
        ]
        return children;
      };

    columns = [
        {
          title: '订单编号',
          dataIndex: 'orderNo',
          key: 'orderNo',
        //   render: text => <a>{text}</a>,
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '订单金额',
          dataIndex: 'orderAmount',
          key: 'orderAmount',
        },
        {
          title: '实付金额',
          dataIndex: 'payAmount',
          key: 'payAmount',
        },
        {
          title: '订单来源',
          dataIndex: 'orderFrom',
          key: 'orderFrom',
        },
        {
            title: '下单时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '支付时间',
            dataIndex: 'payTime',
            key: 'payTime',
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
    
    data = []

    componentWillMount(){
        this.data = reqOrderList()
    }

    render(){
        return (
            <div>
                <Form
                    // form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    // onFinish={onFinish}
                    >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                            // form.resetFields();
                            }}
                        >
                            重置
                        </Button>
                        <a
                            style={{ fontSize: 12 }}
                            onClick={() => {
                            // setExpand(!expand);
                            }}
                        >
                           Collapse
                        </a>
                        </Col>
                    </Row>
                </Form>
                <Table columns={this.columns} dataSource={this.data} />
            </div>
        )
    }
}