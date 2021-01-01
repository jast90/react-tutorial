import React,{Component,useState} from 'react'
import { Form, Row, Col, Input, Button,Table, Space,DatePicker,Card} from 'antd';

import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import importImage from '@bytemd/plugin-import-image';

import 'bytemd/dist/index.min.css';
import 'github-markdown-css'
import 'highlight.js/styles/vs.css';
import 'katex/dist/katex.css';
import "./index.css"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import {reqStoreGoodsAdd,uploadURL} from '../../api'



const plugins = [
    gfm(),
    gemoji(),
    highlight(),
    math(),
    importImage({
      upload:""
    }),
    // Add more plugins here
  ];
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const myUploadFn = (param) => {

  const serverURL = uploadURL
  const xhr = new XMLHttpRequest
  const fd = new FormData()

  const successFn = (response) => {
    console.log(response)
    // 假设服务端直接返回文件上传后的地址
    // 上传成功后调用param.success并传入上传后的文件地址
    param.success({
      url: xhr.responseText,
      // meta: {
      //   id: 'xxx',
      //   title: 'xxx',
      //   alt: 'xxx',
      //   loop: true, // 指定音视频是否循环播放
      //   autoPlay: true, // 指定音视频是否自动播放
      //   controls: true, // 指定音视频是否显示控制栏
      //   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
      // }
    })
  }

  const progressFn = (event) => {
    // 上传进度发生变化时调用param.progress
    param.progress(event.loaded / event.total * 100)
  }

  const errorFn = (response) => {
    // 上传发生错误时调用param.error
    param.error({
      msg: 'unable to upload.'
    })
  }

  xhr.upload.addEventListener("progress", progressFn, false)
  xhr.addEventListener("load", successFn, false)
  xhr.addEventListener("error", errorFn, false)
  xhr.addEventListener("abort", errorFn, false)

  fd.append('file', param.file)
  xhr.open('POST', serverURL, true)
  xhr.send(fd)

}

export default function StoreGoods(){
    const [value, setValue] = useState('');
    const [form] = Form.useForm()
    const onFinish = (values)=>{
      reqStoreGoodsAdd({"name":values.name,"detail":values.detail.toHTML()})
    }
    return (
        <div>
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
            >
              <Form.Item
                    name="name"
                    label="商品名称"
                    rules={[{
                        required:true,
                        message:'请输入商品名称'
                    }]}
                >
                    <Input placeholder="商品名称"></Input>
                </Form.Item>
                <Form.Item
                    name="detail"
                    label="商品详情"
                    rules={[{
                        required:true,
                        message:'请输入商品详情'
                    }]}
                >
                  
                  {/* <ReactQuill value={value}
                    modules={modules}
                    formats={formats}
                    onChange={setValue} /> */}

                  <BraftEditor 
                    value={value}
                    onChange={setValue}
                    media={{
                      uploadFn: myUploadFn
                    }}
                  />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
          </Form>
        </div>
      );
}