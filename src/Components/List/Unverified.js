import React, {useState} from 'react';
import { List, Avatar, Tag, Typography, Button, message } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import {projectFirestore, projectAuth} from  '../../Firebase/config'



const PostList = () => {
    const [editableText,setEditableText] = useState();
    const [values,setValues] = useState([])
    const [selectedKey, setSelectedKey] =useState(null)
      
      
      React.useEffect(()=>{
      const user = projectAuth.currentUser.uid
      const unsub = projectFirestore.collection('Posts')
      .where("uid","==", user)
        .orderBy('createdAt','desc')
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
          },(error)=> console.log(error)) 
        return () => unsub();

      },[])

  
        const onRepost = async () => {
          console.log(editableText,selectedKey)
           try{
               await projectFirestore.collection('Posts').doc(selectedKey).update({
                 Content: editableText, 
                 Status:'pending'
               }) 
     
           }catch(error) {
               message.error(`error uploading doc ${error}`);
               console.log(error)
           }
         }

     return (
         <div>
         <List
         header = 'Posts'
         itemLayout="vertical"
         dataSource={values}
         rowKey={values.key}
         renderItem={item=> (
           <List.Item 
           key={item.key}
           actions={item.status=== 'declined'? [ 
              <Tag color='volcano'>
           {item.status}
         </Tag>, 
           <Button type='text' 
           onClick={onRepost}>
                     Save 
                     </Button>]
                     :[   <Tag color='green'>
                           {item.status}
                         </Tag>,
                     ]}  >
                     <List.Item.Meta 
             avatar= {<Avatar  size={64} icon={<UserOutlined />} />}
              title= {item.title}  
               description={<p> {item.postTime} </p>}       
                    />
               <Typography.Text 
                 
                 editable={
                   item.status=== 'pending'? {
                     icon:<EditOutlined/>,
                   tooltip:'edit post',
                   onStart: setSelectedKey(item.key),
                   onChange: (e)=> setEditableText(e),
                 }: false}
                >
               {item.content} 
                   </Typography.Text> 
               </List.Item>)}
       />
       </div>
       )}
  
 export default PostList;