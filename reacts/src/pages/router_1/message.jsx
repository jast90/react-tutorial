import React,{Component} from 'react'
import {Route} from 'react-router-dom'

import MyNavLink from '../../components/router_1/my-nav-link'
import MessageDetail from './message-detail'

export default class Message extends Component{
    state = {
        messages:[]
    }

    componentDidMount(){
        setTimeout(()=>{
            const messages = [
                {id:1,title:'message001'},
                {id:1,title:'message002'},
                {id:3,title:'message003'},
                {id:4,title:'message004'},
            ]
            this.setState({messages})
        },1000)
    }
    showDetail= (id)=>{
        this.props.history.push(`/home/message/detail/${id}`)
    }
    showDetail2= (id)=>{
        this.props.history.replace(`/home/message/detail/${id}`)
    }
    back = ()=>{
        this.props.history.goBack()
    }

    forward = ()=>{
        this.props.history.goForward()
    }

    reqPage= ()=>{
        window.location = 'https://www.baidu.com'
    }


    render(){
        return (
            <div>
                <ul>
                    {
                        this.state.messages.map((m,index)=>(
                            <li key={index}>
                                <MyNavLink to={`/home/message/detail/${m.id}`}>{m.title}</MyNavLink>
                                <button onClick={()=>{this.showDetail(m.id)}}>push()查看</button>
                                <button onClick={()=>{this.showDetail2(m.id)}}>replace()查看</button>
                            </li>
                        ))
                    }
                </ul>
                <p>
                    <button onClick={this.back}>回退</button>
                    <button onClick={this.forward}>前进</button>
                </p>
                <p>
                    <button onClick={this.reqPage}>页面跳转</button>
                </p>

                <Route path='/home/message/detail/:id' component={MessageDetail}></Route>
            </div>
        )
    }
}