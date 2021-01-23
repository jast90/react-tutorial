import React,{Component,useState,useEffect} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card,Select,Modal} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqAccountPage,reqPayWayList,reqAccountPayInfoAdd} from '../../api'

import SearchTable from '../../components/search-table'

const { Option } = Select;

const Account = (props) => {
    const [payWayList,setPayWayList] = useState([])

    useEffect(() => {
        reqPayWayList().then((data)=>{
            setPayWayList({payWayList:data.data})
        })
        }, []
    )

    const getOptions = ()=>{
        let options = []
        // payWayList.forEach((element,index) => {
        //     options.push(<Option value={element.payWayCode}>{element.payWayName}</Option>)
        // })
        return options
    }

    const columns = [
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

    const searchFormFields = [
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

    const addFormFields = [
        (<Form.Item
            name="appId"
            label="appId"
            rules={[{
                required:true,
                message:'请输入appId'
            }]}
        >
            <Input></Input>
        </Form.Item>),
        (<Form.Item
            name="appSecret"
            label="appSecret"
            rules={[{
                required:true,
                message:'请输入appSecret'
            }]}
        >
            <Input></Input>
        </Form.Item>),
        (<Form.Item
            name="merchantId"
            label="商户编号"
            rules={[{
                required:true,
                message:'请输入商户编号'
            }]}
        >
            <Input placeholder="商户编号（微信，支付宝等提供）"></Input>
        </Form.Item>
        ),
        (<Form.Item
            name="partnerKey"
            label="partnerKey"
            rules={[{
                required:true,
                message:'请输入partnerKey'
            }]}
        >
            <Input placeholder="请输入partnerKey"></Input>
        </Form.Item>
        ),
        (<Form.Item
            name="payWayCode"
            label="支付方式"
            rules={[{
                required:true,
                message:'请选择支付方式'
            }]}
        >
            <Select >
                {
                    getOptions()
                }
            </Select>
        </Form.Item>
        )
    ]
    
    

    return (
        <SearchTable 
        columns={columns}
        searchFormFields={searchFormFields}
        requestPage={reqAccountPage}
        addFormFields={addFormFields}
        requestAdd={reqAccountPayInfoAdd}
        />
    )
}


export default Account
