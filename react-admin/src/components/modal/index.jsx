export default function ModalForm({title,visible,onCancel,onOk,initialValues={}}){
    const [form] = Form.useForm()
    if(initialValues){
        form.setFieldsValue(initialValues)
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
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch checked/>
                </Form.Item>
            </Form>
        </Modal>
    )
}