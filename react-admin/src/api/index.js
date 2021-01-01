import request from './request'

export const uploadURL="/oss/upload/jastz"

/**
 * 通用获取分页数据
 */
const requestPage = (url,pageNumber=1,pageSize=15,domain) => request(url,{"pageRequest":{pageNumber,pageSize},"domain":domain},"POST")

/**
 * 登入
 * @param {} username 
 * @param {*} passowrd 
 */
export const reqLogin = (username,passowrd)=>{
    request("/userinfo")
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
        {path:"/red/pack/order",title:"红包订单",icon:"<PieChartOutlined />"}
        ,{path:"/transfer/order",title:"转账订单",icon:"<PieChartOutlined />"}
        ,{path:"/store/goods",title:"商品",icon:"<PieChartOutlined />",children:[
            {path:"/store/goods",title:"商品列表",icon:"<PieChartOutlined />"},
            {path:"/store/goods/add",title:"发布商品",icon:"<PieChartOutlined />"}
        ]}
        ,{path:"/store",title:"门店列表",icon:"<PieChartOutlined />"}
    ]
}

/**
 * 获取订单列表
 */
export const reqOrderPage = (pageNumber=1,pageSize=15,domain) => requestPage("/order/page",pageNumber,pageSize,domain)

/**
 * 分页查询
 * @param {*} pageNumber 
 * @param {*} pageSize 
 * @param {*} domain 
 */
export const reqPayProductPage =  (pageNumber=1,pageSize=15,domain) => requestPage("/pay/product/page",pageNumber,pageSize,domain)
/**
 * 添加
 * @param {*} productName 
 * @param {*} productCode 
 * @param {*} auditStatus 
 */
export const reqAddPayProduct = (productName,productCode,auditStatus)=> request("/pay/product",{productName,productCode,auditStatus},"POST")
/**
 * 修改
 * @param {*} domain 
 */
export const reqUpdatePayProduct = (domain) => request("/pay/product",domain,"PUT")
export const reqPayProductList = () => request("/pay/product/list",{},"POST")

export const reqAccountPage = (pageNumber=1,pageSize=15,domain) => requestPage("/account/page",pageNumber,pageSize,domain)

export const reqAccountHistoryPage = (pageNumber=1,pageSize=15,domain) => requestPage("/account/history/page",pageNumber,pageSize,domain)

export const reqAccountPayConfigPage = (pageNumber=1,pageSize=15,domain) => requestPage("/account/pay/config/page",pageNumber,pageSize,domain)

export const reqAccountPayInfoPage = (pageNumber=1,pageSize=15,domain) => requestPage("/account/pay/info/page",pageNumber,pageSize,domain)
export const reqAccountPayInfoAdd = (domain) => request("/account/pay/info",domain,"POST")

export const reqPayWayPage = (pageNumber=1,pageSize=15,domain) => requestPage("/pay/way/page",pageNumber,pageSize,domain)
export const reqPayWayList = () => request("/pay/way/list",{},"POST")
export const reqAddPayWay = (domain) => request("/pay/way",domain,"POST")
export const reqUpdatePayWay = (domain) => request("/pay/way",domain,"PUT")


export const reqProfitSharingOrderPage = (pageNumber=1,pageSize=15,domain) => requestPage("/profit/sharing/order/page",pageNumber,pageSize,domain)

export const reqProfitSharingReceiverPage = (pageNumber=1,pageSize=15,domain) => requestPage("/profit/sharing/receiver/page",pageNumber,pageSize,domain)

export const reqProfitSharingReturnOrderPage = (pageNumber=1,pageSize=15,domain) => requestPage("/profit/sharing/return/order/page",pageNumber,pageSize,domain)

export const reqRedPackOrderPage = (pageNumber=1,pageSize=15,domain) => requestPage("/red/pack/order/page",pageNumber,pageSize,domain)

export const reqTransferOrderPage = (pageNumber=1,pageSize=15,domain) => requestPage("/transfer/order/page",pageNumber,pageSize,domain)

export const reqStorePage = (pageNumber=1,pageSize=15,domain) => requestPage("/store/page",pageNumber,pageSize,domain)

export const reqStoreGoodsPage = (pageNumber=1,pageSize=15,domain) => requestPage("/store/goods/page",pageNumber,pageSize,domain)

export const reqStoreGoodsAdd = (domain) => request("/store/goods",domain,"POST")