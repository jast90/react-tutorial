import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import MyNavLink from '../../components/router_1/my-nav-link'
import News from './news'
import Message from './message'

export default function About(){
    return (
    <div>
        <h2>Home 组件内容</h2>
        <div>
            <ul className="nav nav-tabs">
                <li>
                    <MyNavLink to='/home/news'>新闻</MyNavLink>
                </li>
                <li>
                    <MyNavLink to='/home/message'>消息</MyNavLink>
                </li>
            </ul>
            <div>
                <Switch>
                    <Route path='/home/news' component={News}/>
                    <Route path='/home/message' component={Message}/>
                    <Redirect to='/home/news'/>
                </Switch>
            </div>
        </div>
    </div>
    )
}