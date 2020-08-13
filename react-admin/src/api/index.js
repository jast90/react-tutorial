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

export const reqMenuList = ()=>{
    return [
        {path:"/home",title:"首页",icon:"<PieChartOutlined />"},
        {path:"/account",title:"账户管理",icon:"<PieChartOutlined />",children:[{
            path:"/account/history",title:"账户明细"
        },{
            path:"/account/pay/config",title:"账户支付配置"
        },{
            path:"/account/pay/info",title:"账户支付信息"
        }]},
        {path:"/product",title:"商品管理",icon:"<PieChartOutlined />"},
        {path:"/order",title:"订单管理",icon:"<PieChartOutlined />"},
        {path:"/pay",title:"支付管理",icon:"<PieChartOutlined />",children:[
            {path:"/pay/product",title:"支付产品",icon:"<PieChartOutlined />"},
            {path:"/pay/way",title:"支付方式",icon:"<PieChartOutlined />"},
        ]},
        {path:"/profit",title:"分账管理",icon:"<PieChartOutlined />",children:[
            {path:"/profit/order",title:"分账订单",icon:"<PieChartOutlined />"},
            {path:"/profit/receiver",title:"分账接收方",icon:"<PieChartOutlined />"},
            {path:"/profit/return/order",title:"分账退回订单",icon:"<PieChartOutlined />"},
        ]},
        {path:"/red/pack/order",title:"红包订单",icon:"<PieChartOutlined />"},
        {path:"/transfer/order",title:"转账订单",icon:"<PieChartOutlined />"},
    ]
}