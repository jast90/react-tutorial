import React from 'react'

 const allMessages = [
     {id:1,title:'message001',content:'我爱你，中国'},
     {id:2,title:'message002',content:'我爱你，中国'},
     {id:3,title:'message003',content:'我爱你，中国'},
     {id:4,title:'message004',content:'我爱你，中国'},
 ]

 export default function MessageDetail(props){
     const {id} = props.match.params
     const message = allMessages.find((m)=>m.id===id*1)
     return (
         <ul>
             <li>id{message.id}</li>
             <li>titile：{message.title}</li>
             <li>content：{message.content}</li>
         </ul>
     )
 }
