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


export default function StoreGoods(){
    const [value, setValue] = useState('');

    return (
        <div>
          <Editor
            value={value}
            plugins={plugins}
            onChange={(v) => {
              setValue(v);
            }}
          />

          <Viewer 
            value={value}  
            plugins={plugins} />
        </div>
      );
}