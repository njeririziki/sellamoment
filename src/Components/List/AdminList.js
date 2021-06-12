import React, {useState} from 'react';
import {  Form,Input,Tooltip,Tag, List, Avatar, Typography, Button, message } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import {projectFirestore} from  '../../Firebase/config'


const PostList = ({title}) => {
    const [editableText,setEditableText] = useState();
    const [values,setValues] = useState([])
    const [selectedKey, setSelectedKey] =useState(null)
     
      
      React.useEffect(()=>{
      const unsub = projectFirestore.collection('Posts') 
        .orderBy('createdAt', 'desc')
           .onSnapshot((docSnapshot)=>{
            const post=[];
           docSnapshot.docs.forEach((doc)=>{
                post.push({
                    title:  doc.data().Title,
                    author:doc.data().Author,
                    content:doc.data().Content,
                    status: doc.data().Status,
                     postTime:doc.data().postTime ,
                    key: doc.id})  
              });
              setValues(post) ; 
          },(error)=>  console.log(`${error} postList`))  
        return () => unsub();

      },[])

      const onSaveEdit = async()=>{
        console.log(editableText,selectedKey);
        try{
          await projectFirestore.collection('Posts').doc(selectedKey).update({
            Content: editableText, 
            Status:'verified'
          })
          message.success('Repost successful')

      }catch(error) {
          message.error(`error uploading edits please try again`);
          console.log(error)
      }
         
      }
      const onDecline = async (key) => {
        console.log(`${key} passed down on decline`)
         try{
             await projectFirestore.collection('Posts').doc(key).update({
               Status:'declined'
             })
             message.success('Post declined')
         }catch(error) {
             message.error(`Error updating document please check your intenet connection`);
             console.log(error)
         }
       }
  
        const onVerify = async (key) => {
          console.log(`${key} passed down on verify`)
          
           try{
               await projectFirestore.collection('Posts').doc(key).update({
                 Status:'verified'
               })
               message.success('Verified')
     
           }catch(error) {
               message.error(`error uploading doc ${error}`);
               console.log(error)
           }
         }

     return (
         <List
         header={<Typography.Title level={4}>
                {title}
         </Typography.Title>}
         itemLayout="vertical"
         dataSource={values}
         rowKey={values.key}
         renderItem={item=> (
           <List.Item 
           actions={ item.status=== 'pending'?[ 
            <Button
            type='dashed'
            onClick={onSaveEdit}>
                     Save Edit
                    </Button>,  
              <Button
              style={{ backgroundColor:'#f05545',color:'#ffffff',}}
              type='default'
            onClick={()=>onDecline(item.key)}
          >
            Decline
          </Button> ,
           <Button
           style={{ backgroundColor:'#88c399',color:'#ffffff'}}
           type='default'
           onClick={()=>onVerify(item.key)}>
                     Verify
                     </Button>]
                     :[
                      <Tag color='green'>
                      {item.status}
                    </Tag>
                     ]}  >
                     <List.Item.Meta 
                      avatar= {<Avatar  size={64} icon={<UserOutlined />} />}
                        title={item.title}  
                             
                    description= {
                      <Typography.Text
                      style={{color:'#00766c'}}>
                      Post by {item.author? item.author :'anonymous'}<br/>
                      {item.postTime}
                        </Typography.Text>
                      }
                        />
              
               <Typography.Text 
                 editable={item.status=== 'pending'?{
                   onStart: setSelectedKey(item.key),
                   onChange: (e)=>setEditableText(e),
                 }:false}
                >
               {item.content} 
                   </Typography.Text> 
           
          
          
               </List.Item>)}
    
       />
   
     
       )}
  
 export default PostList;