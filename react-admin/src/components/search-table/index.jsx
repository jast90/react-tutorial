import React,{useState} from 'react'
import { Select,Form, Row, Col, Input, Button,Table, Space,DatePicker,Card} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const MyForm = ({formFields,onSearch}) => {
    const [expand,setExpand] = useState(false)
    const [searchForm] = Form.useForm()
    
    React.useEffect(()=>{
        console.log("MyForm mount");
        return ()=>{
            console.log("MyForm unmount")
        }
    },[])

    const getFields = () => {
        //展开的输入框数量
        const count = 6;
        const children = [
            (
                <Col span={8} key="orderNo">
                    <Form.Item
                    name='orderNo'
                    label='订单号'
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: '请输入订单号!',
                    //     },
                    // ]}
                    >
                    <Input placeholder="请输入订单号" />
                    </Form.Item>
                </Col>
            )
        ]
        if(formFields){
            return expand?formFields:formFields.slice(0,count);
        }
        return expand?children:children.slice(0,count);
    }

    const onFinish = values =>{
        console.log(values)
        onSearch(values)
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

const MyTable = ({columns,reqPage,paginationParam})=>{

    React.useEffect(()=>{
        console.log("MyTable mount");
        getPage()
        return ()=>{
            console.log("MyTable unmount")
        }
    },[])

    const [data,setData] = React.useState([])
    const [loading,setLoading] = React.useState(false)
    const [pagination,setPagination] = React.useState({current: 1,pageSize: 1})
    const [condition,setCondition] = React.useState({})

    const getPage = () =>{
        setLoading(true)
        if(paginationParam){
            setPagination({
                current:paginationParam.current,
                pageSize:paginationParam.pageSize,
            })
            setCondition(paginationParam.condition)
        }
        const {current,pageSize} = pagination
        reqPage(current,pageSize,condition).then(result=>{
            setLoading(false)
            setData(result.data.content)
            setPagination({
                current:current,
                pageSize:pageSize,
                total:result.data.total
            })
        })
    }

    return (
        <Card style={{ marginTop: '16px' }} >
            <Table 
                columns={columns} 
                loading={loading}
                pagination={pagination}
                dataSource={data}
                onChange={getPage}
                />
        </Card>
    )
}

export default function SearchTabl({formFields,columns,reqPage,paginationParam}){

    return (
        <div>
            <MyForm 
                formFields={formFields}
                onSearch={reqPage}
                />
            <MyTable 
                columns={columns}
                reqPage={reqPage}
                paginationParam={paginationParam}
            />
        </div>
    );
}