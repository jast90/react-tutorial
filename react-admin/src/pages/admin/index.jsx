import React,{ Component } from "react";
import {Redirect,Switch, Route,} from 'react-router-dom'
import {Layout} from 'antd'

import storageUtils from '../../utils/storageUtils'
import './index.css'
import LeftNav from '../../components/left-nav'
import MyHeader from '../../components/header'
import MyFooter from '../../components/footer'
import Home from '../home'
import Account from '../account'
import AccountHistory from '../account-history'
import AccountPayConfig from '../account-pay-config'
import AccountPayInfo from '../account-pay-info'
import PaymentOrder from '../payment-order'
import PayProduct from '../pay-product'
import PayWay from '../pay-way'
import ProfitSharingOrder from '../profit-sharing-order'
import ProfitSharingReceiver from '../profit-sharing-receiver'
import ProfitSharingReturnOrder from '../profit-sharing-return-order'
import RedPackOrder from '../red-pack-order'
import TransferOrder from '../transfer-order'

const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    state = {
        collapsed: false,
    };
    
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render(){
        const user = storageUtils.getUser()
        if(!user){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                          //collapsible 
                          collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                    ><LeftNav/></Sider>
                    <Layout>
                        <Header><MyHeader /></Header>
                        <Content style={{ margin: '16px' }}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/account/history' component={AccountHistory}/>
                                <Route path='/account/pay/config' component={AccountPayConfig}/>
                                <Route path='/account/pay/info' component={AccountPayInfo}/>
                                <Route path='/account' component={Account}/>
                                <Route path='/payment/order' component={PaymentOrder}/>
                                <Route path='/pay/product' component={PayProduct}/>
                                <Route path='/pay/way' component={PayWay}/>
                                <Route path='/pay/way' component={PayWay}/>
                                <Route path='/profit/sharing/order' component={ProfitSharingOrder}/>
                                <Route path='/profit/sharing/receiver' component={ProfitSharingReceiver}/>
                                <Route path='/profit/sharing/return/order' component={ProfitSharingReturnOrder}/>
                                <Route path='/red/pack/order' component={RedPackOrder}/>
                                <Route path='/transfer/order' component={TransferOrder}/>
                            </Switch>
                        </Content>
                        <Footer><MyFooter /></Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

