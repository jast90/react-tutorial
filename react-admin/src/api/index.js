import request from './request'

/**
 * 登入
 * @param {} username 
 * @param {*} passowrd 
 */
export const reqLogin = (username,passowrd)=>{
    // return request('/login',{username,passowrd},'POST')
    return {code:0,data:{id:123,name:"admin"},msg:"用户名密码错误"}
}