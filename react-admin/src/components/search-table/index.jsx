import React,{useState,useEffect} from 'react'
import { Select,Form, Row, Col, Input, Button,Table, Space,DatePicker,Card} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

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

const SearchTable = (props) =>{
    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({current: 1,pageSize: 15})
    const [condition,setCondition] = useState({})
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        getPage()
      }, [])

    const columns = props.columns


    const getPage = (paginationParam) =>{
        console.log("getPage")
        setLoading(true)
        let myPagination = paginationParam
        if(!myPagination){
            myPagination = pagination
        }
        const {current,pageSize} = myPagination
        
        props.onPage(current,pageSize,condition).then(result=>{
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

export default SearchTable