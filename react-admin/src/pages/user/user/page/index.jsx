import React,{Component,useState,useEffect} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card,Select,Modal} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {reqUserPage} from '../../../../api'

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
                    name='userName'
                    label='用户名'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入用户名!',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入用户名" />
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

const User = (props) =>{
    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({current: 1,pageSize: 15})
    const [condition,setCondition] = useState({})
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        getPage()
      }, [])

    const columns = [
        {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName',
          fixed:"left",
        //   render: text => <a>{text}</a>,
        },
        {
            title: '名字',
            dataIndex: 'firstName',
            key: 'firstName',
          //   render: text => <a>{text}</a>,
        },
        {
            title: '姓氏',
            dataIndex: 'lastName',
            key: 'lastName',
          //   render: text => <a>{text}</a>,
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '电子邮件',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '用户来源',
          dataIndex: 'userFrom',
          key: 'userFrom',
        },
        
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (text, record) => (
            <Space size="middle">
              <a>角色</a>
            </Space>
          ),
        },
    ];


    const getPage = (paginationParam) =>{
        console.log("getPage")
        setLoading(true)
        let myPagination = paginationParam
        if(!myPagination){
            myPagination = pagination
        }
        const {current,pageSize} = myPagination
        reqUserPage(current,pageSize,condition).then(result=>{
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
                    setPagination({current: 1})
                    const {total,pageSize} = pagination
                    getPage({
                        current: 1,
                        pageSize: pageSize,
                        total: total
                    })
                }}
            />
            <Card style={{ marginTop: '16px' }} extra={<Button type="primary" onClick={()=>this.setAddVisible(true)}  shape="round">添加</Button>}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    />
            </Card>
        </div>
    )
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


export default User