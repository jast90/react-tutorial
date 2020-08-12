import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import MyNavLink from '../../components/router_1/my-nav-link'
import About from './about'
import Home from './home'

export default class MyHome extends React.Component{
    render(){
        return (
            <div>
                <div className="row">
                    <div className="offset-md-2 col-md-8">
                        <div className="page-header">
                            <h2>React Router Demo</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-2 col-md-2">
                        <div className="list-group">
                            <MyNavLink className="list-group-item" to='/about'>About</MyNavLink>
                            <MyNavLink className="list-group-item" to='/home'>Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path='/about' component={About}/>
                                    <Route path='/home' component={Home}/>
                                    <Redirect to='/about' />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}