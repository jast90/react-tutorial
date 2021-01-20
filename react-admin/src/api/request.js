import {message} from 'antd'
import axios from 'axios'
import storageUtils from '../utils/storageUtils'

export default function request(url,data={},method='GET',headers={},auth={}){
    return new Promise((resolve,reject)=>{
        const user = storageUtils.getUser()
        let promise 
        if( user ){
            headers = {
                Authorization: "Bearer "+user.access_token
            }
            promise = axios({
                headers:headers,
                method:method,
                url:url,
                data:data
            })
        }else{
            promise = axios({
                headers:headers,
                method:method,
                url:url,
                auth:auth,
                data:data
            })
        }
        

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
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if(error.response.status==400){
                    message.error('用户名或密码错误')
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        })
    })
}
