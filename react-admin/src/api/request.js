import {message} from 'antd'
import axios from 'axios'

export default function request(url,data={},method='GET',headers={},auth={}){
    return new Promise((resolve,reject)=>{
        let promise = axios({
            headers:headers,
            method:method,
            url:url,
            auth:auth,
            data:data
        })

        // switch (method) {
        //     case "GET":
        //         promise = axios.get(url,{params:data},config)
        //         break;
        //     case "POST": 
        //         promise = axios.post(url,data,config)
        //         break;
        //     case "PUT":
        //         promise = axios.put(url,data,config)
        //         break;
        //     default:
        //         break;
        // }
        
        promise.then(response => {
            resolve(response.data)
        }).catch(error=>{
            console.log(url,error)
            message.error('请求出错了')
        })
    })
}
