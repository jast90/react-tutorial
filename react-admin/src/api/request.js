import {message} from 'antd'
import axios from 'axios'

export default function request(url,data={},method='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        switch (method) {
            case "GET":
                promise = axios.get(url,{params:data})
                break;
            case "POST": 
                promise = axios.post(url,data)
                break;
            case "PUT":
                promise = axios.put(url,data)
                break;
            default:
                break;
        }
        
        promise.then(response => {
            resolve(response.data)
        }).catch(error=>{
            console.log(url,error)
            message.error('请求出错了')
        })
    })
}