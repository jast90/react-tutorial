import React,{useState} from 'react'
import { Form,Modal} from 'antd'

const ModalForm = ({title,show,onCancel,onOk,initialValues={},formItems=[]}) => {
    const [form] = Form.useForm()

    if(initialValues){
        form.setFieldsValue(initialValues)
    }

    return(
        <Modal
            title={title}
            centered
            visible={show}
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
                {formItems}
            </Form>
        </Modal>
    )
}

export default ModalForm