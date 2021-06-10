import React, {useState} from 'react';
import {  Tooltip, List, Avatar, Typography, Button, message } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import {projectFirestore, projectAuth} from  '../../Firebase/config'


const PostList = ({data,title,repost}) => {
    const [editableText,setEditableText] = useState( );
    const [values,setValues] = useState([])
      
      
      React.useEffect(()=>{
      const uid = projectAuth.currentUser.uid
      const userRef = projectFirestore.collection('Blogs').doc(uid)
      
        try{
           userRef.get().then((docSnapshot)=>{
          if(docSnapshot.exists){
           userRef.onSnapshot((doc)=>{
              const goal=[]
                goal.push({
                     title:  doc.data().Title,
                    author:doc.data().Author,
                    content:doc.data().Content,
                    status: doc.data().Status,
                    key: doc.id,
                })
               setEditableText(doc.data().Content)
              setValues(goal) ; 

              });
            }    
          }); 
        } catch (error){
           alert(error)
        }   
      
      
      },[])
  
        const onRepost = async (values) => {
          console.log(values);
           const user= projectAuth.currentUser.uid
            if(user ) {
             console.log( `User is ${user}`)
            } 
           try{
               await projectFirestore.collection('Blogs').doc(user).update({
                 Content: editableText, 
               })
               //onCancel();
               message.success('Repost successful')
     
           }catch(error) {
               message.error(`error uploading doc ${error}`)
           }
         }

     return (
         <div>
         <List
         header={<Typography.Title level={4}>
                {title}
         </Typography.Title>}
         itemLayout="horizontal"
         dataSource={values}
         renderItem={item=> (
           <List.Item key={item.key}
           actions={[ <Button onClick={onRepost}>
                     Repost
                     </Button>]}  >
               <List.Item.Meta 
              avatar= {<Avatar size="large" icon={<UserOutlined />} />}
               title={  <Typography.Title level={5}>
                       <b>{item.title}</b>  <br/>
                        </Typography.Title>
                     }
               description= {<Typography.Paragraph 
                 editable={{
                   tooltip: false,
                   onChange: setEditableText
                 }}>
                {editableText}
                 </Typography.Paragraph>}
               />
              {/* <div>  
              { item.avatar? <Link href='/client_id' as={`/client_${item.key}`}>
           <a>Manage</a>
           </Link>:'' } 
              </div>
           */}
               </List.Item>)}
    
       />
       </div>
       )}
  
 export default PostList;