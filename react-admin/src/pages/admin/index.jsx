import React,{ Component } from "react";
import {Redirect,Switch, Route} from 'react-router-dom'
import {Layout, Menu, Row,Col} from 'antd'
import Home from '../home'
import Product from '../product'

import storageUtils from '../../utils/storageUtils'
import './index.css'
import LeftNav from '../../components/left-nav'
import MyHeader from '../../components/header'
import MyFooter from '../../components/footer'

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
                          collapsible 
                          collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                    ><LeftNav/></Sider>
                    <Layout>
                        <Header><MyHeader /></Header>
                        <Content>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/product' component={Product}/>
                            </Switch>
                        </Content>
                        <Footer><MyFooter /></Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}