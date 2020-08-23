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
            path:"/account",title:"账户"
        },{
            path:"/account/history",title:"账户明细"
        },{
            path:"/account/pay/config",title:"账户支付配置"
        },{
            path:"/account/pay/info",title:"账户支付信息"
        }]},
        {path:"/order",title:"订单管理",icon:"<PieChartOutlined />",children:[
            {path:"/payment/order",title:"支付订单",icon:"<PieChartOutlined />"}
        ]},
        {path:"/pay",title:"支付管理",icon:"<PieChartOutlined />",children:[
            {path:"/pay/product",title:"支付产品",icon:"<PieChartOutlined />"},
            {path:"/pay/way",title:"支付方式",icon:"<PieChartOutlined />"},
        ]},
        {path:"/profit",title:"分账管理",icon:"<PieChartOutlined />",children:[
            {path:"/profit/sharing/order",title:"分账订单",icon:"<PieChartOutlined />"},
            {path:"/profit/sharing/receiver",title:"分账接收方",icon:"<PieChartOutlined />"},
            {path:"/profit/sharing/return/order",title:"分账退回订单",icon:"<PieChartOutlined />"},
        ]},
        {path:"/red/pack/order",title:"红包订单",icon:"<PieChartOutlined />"},
        {path:"/transfer/order",title:"转账订单",icon:"<PieChartOutlined />"},
    ]
}

/**
 * 获取订单列表
 */
export const reqOrderList = () => {
    let data = [
        {
          id: '1',
          orderNo: '123213123',
          orderAmount: 20.5,
          payAmount: 20.5,
          orderFrom: '小程序',
        },
        {
            id: '2',
            orderNo: '123213123',
            orderAmount: 20.5,
            payAmount: 20.5,
            orderFrom: '小程序',
        },
        {
            id: '3',
            orderNo: '123213123',
            orderAmount: 20.5,
            payAmount: 20.5,
            orderFrom: '小程序',
        },
        {
            id: '4',
            orderNo: '123213123',
            orderAmount: 20.5,
            payAmount: 20.5,
            orderFrom: '小程序',
        },
        {
            id: '5',
            orderNo: '123213123',
            orderAmount: 20.5,
            payAmount: 20.5,
            orderFrom: '小程序',
          },
          {
              id: '6',
              orderNo: '123213123',
              orderAmount: 20.5,
              payAmount: 20.5,
              orderFrom: '小程序',
          },
          {
              id: '7',
              orderNo: '123213123',
              orderAmount: 20.5,
              payAmount: 20.5,
              orderFrom: '小程序',
          },
          {
              id: '8',
              orderNo: '123213123',
              orderAmount: 20.5,
              payAmount: 20.5,
              orderFrom: '小程序',
          },
          {
            id: '9',
            orderNo: '123213123',
            orderAmount: 20.5,
            payAmount: 20.5,
            orderFrom: '小程序',
          },
          {
              id: '10',
              orderNo: '123213123',
              orderAmount: 20.5,
              payAmount: 20.5,
              orderFrom: '小程序',
          },
          {
              id: '11',
              orderNo: '123213123',
              orderAmount: 20.5,
              payAmount: 20.5,
              orderFrom: '小程序',
          },
          {
              id: '12',
              orderNo: '123213123',
              orderAmount: 20.5,
              payAmount: 20.5,
              orderFrom: '小程序',
          },
      ];
    return data;
}

export const reqPayProductList =  (pageNumber=1,pageSize=15,domain) => request("/pay/product/page",{"pageRequest":{pageNumber,pageSize},"domain":domain},"POST")

export const reqAddPayProduct = (productName,productCode,auditStatus)=> request("/pay/product",{productName,productCode,auditStatus},"POST")