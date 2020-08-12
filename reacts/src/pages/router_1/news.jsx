import React,{Component} from 'react'
export default class News extends Component{
    state = {
        newArr:[
            'news001',
            'news002',
            'news004',
        ]
    }
    render(){
        return (
            <ul>
                {
                    this.state.newArr.map((news,index)=><li key={index}>{news}</li>)
                }
            </ul>
        )
    }

}
