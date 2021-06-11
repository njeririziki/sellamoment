import React, {useState} from 'react';
import {  Form,Input,Tooltip, List, Avatar, Tag, Typography, Button, message } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom'
import { RestFilled, UserOutlined } from '@ant-design/icons';
import {projectFirestore, projectAuth} from  '../../Firebase/config'

const EditForm = ({key,defValue,settext,onedit})=>{
 return(
  <Form.Item>
  <Input.TextArea id={key} defaultValue={defValue}
  onChange={settext} onPressEnter={onedit}/>
</Form.Item>
 )

}

const PostList = ({data,title,repost, openModal,buttonName}) => {
    const [editableText,setEditableText] = useState();
    const [values,setValues] = useState([])
    const [edit, setEdit] = useState(false)
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
                    key: doc.id})  
              });
              setValues(post) ; 
          },(error)=> console.log(error)) 
        return () => unsub();

      },[])

      const onEdit =()=>{
        console.log(editableText,selectedKey);
        setValues([...values, 
          values[1].content= editableText])
          console.log( values)
      }
  
        const onRepost = async () => {
          console.log(editableText,selectedKey)
           try{
               await projectFirestore.collection('Posts').doc(selectedKey).update({
                 Content: editableText, 
               })
               //onCancel();

               message.success('Repost successful')
     
           }catch(error) {
               message.error(`error uploading doc ${error}`);
               console.log(error)
           }
         }

     return (
         <div>
           {values?
         <List
         header = 'Posts'
         itemLayout="vertical"
         dataSource={values}
         rowKey={values.key}
         renderItem={item=> (
           <List.Item 
           key={item.key}
           actions={[ 
              <Tag color='gold'>
           {item.status}
         </Tag>, 
              <a href='/'
            onClick={() => setEdit(true)}
            style={{
              marginRight: 8,
            }}
          >
            Edit
          </a> ,
           <a  href='/'
           onClick={onRepost}>
                     Save
                     </a>]}  >
                     <List.Item.Meta 
             avatar= {<Avatar  size={64} icon={<UserOutlined />} />}
              title= {item.title}  
                      
                    />
              {/* {edit? 
              <EditForm key={item.key} defValue={item.content}
                settext={ 
                  (e,)=> setValues([...values, 
                   values[1].content= e.target.value])
                }  onedit={onEdit}/>  */}
               <Typography.Text 
                 
                 editable={{
                   onStart: setSelectedKey(item.key),
                   onChange: setEditableText,
                   onEnd: onEdit
                 }}
                >
               {item.content} 
                   </Typography.Text> 
           
          
               </List.Item>)}
    
       />
       : '' }
     
   
       </div>
       )}
  
 export default PostList;