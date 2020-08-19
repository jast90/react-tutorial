import React,{Component} from 'react'
import { Modal,Form, Row, Col, Input, Button,Table, Space,DatePicker,Switch} from 'antd';

import {reqPayProductList} from '../../api'

const { RangePicker } = DatePicker;

const ModalForm = ({visible,onCancel,onAddPayProduct,initialValues={}}) => {
    const [form] = Form.useForm()
    
    return(
        <Modal
                title="添加支付产品"
                centered
                visible={visible}
                onOk={() => {
                    form.validateFields().then(values=>{
                        console.log(values)
                        form.resetFields();
                        onAddPayProduct(values)
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
                >
                <Form
                    form={form}
                    labelCol={{span:6}}
                    wrapperCol={{span:14}}
                    initialValues={initialValues}
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
                    >
                        <Switch defaultChecked={true}/>
                    </Form.Item>
                </Form>
            </Modal>
    )
}

export default class PayProduct extends Component{

    state = {
        addVisible: false,
        updateVisible: false,
    }

    setAddVisible(addVisible){
        this.setState({addVisible})
    }

    setUpdateVisible(updateVisible,payProduct){
        this.setState({updateVisible})
        if(updateVisible){
            this.payProduct = payProduct
        }
    }

    getFields = () => {
        const children = [
            (
                <Col span={8} key="productCode">
                    <Form.Item
                    name='productCode'
                    label='支付产品编号'
                    rules={[
                        {
                        required: true,
                        message: '请输入支付产品编号!',
                        },
                    ]}
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
                    rules={[
                        {
                        required: true,
                        message: '请输入支付产品名称！',
                        },
                    ]}
                    >
                        <Input placeholder="请输入支付产品名称" />
                    </Form.Item>
                </Col>
            ),
        ]
        return children;
      };

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
      ];
    
    data = []

    componentWillMount(){
        this.data = reqPayProductList()
        
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
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }} type="primary">
                        <Button onClick={()=>this.setAddVisible(true)}>添加</Button>
                    </Col>
                </Row>
                <Table columns={this.columns} dataSource={this.data} />
                <ModalForm 
                    visible={this.state.addVisible} 
                    onCancel={()=>{this.setAddVisible(false)}} 
                    onAddPayProduct={()=>{
                        this.setAddVisible(false)
                    }}
                />
                <ModalForm 
                    visible={this.state.updateVisible} 
                    onCancel={()=>{this.setUpdateVisible(false)}} 
                    onAddPayProduct={()=>{
                        this.setUpdateVisible(false)
                    }}
                    initialValues={this.payProduct}
                />
            </div>
        )
    }
}