import React, {useState} from 'react';
import {  Form,Input,Tooltip, List, Avatar, Typography, Button, message } from 'antd';
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

const PostList = ({data,title,repost}) => {
    const [editableText,setEditableText] = useState();
    const [values,setValues] = useState([])
    const [edit, setEdit] = useState(false)
    const [selectedKey, setSelectedKey] =useState(null)
      
      
      React.useEffect(()=>{
      const unsub = projectFirestore.collection('Posts') 
        .orderBy('createdAt', 'desc')
           .onSnapshot((docSnapshot)=>{
            const post=[];
           docSnapshot.forEach((doc)=>{
                post.push({
                    title:  doc.data().Title,
                    author:doc.data().Author,
                    content:doc.data().Content,
                    status: doc.data().Status,
                    key: doc.id})  
              });
              setValues(post) ; 
          },(error)=>  console.log(`${error} postList`))  
        return () => unsub();

      },[])

      const onEdit =()=>{
        console.log(editableText,selectedKey);
         console.log(values.findIndex(key => key === selectedKey))
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
          
         <List
         header={<Typography.Title level={4}>
                {title}
         </Typography.Title>}
         itemLayout="vertical"
         dataSource={values}
         rowKey={values.key}
         renderItem={item=> (
           <List.Item 
           key={item.key}
           actions={[   
              <Button
              style={{ backgroundColor:'#f05545',color:'#ffffff',}}
              type='default'
            onClick={() => setEdit(true)}
          >
            Decline
          </Button> ,
           <Button
           style={{ backgroundColor:'#88c399',color:'#ffffff'}}
           type='default'
           onClick={onRepost}>
                     Verify
                     </Button>]}  >
                     <List.Item.Meta 
                      avatar= {<Avatar  size={64} icon={<UserOutlined />} />}
                        title={item.title}  
                             
                    description= {
                      <Typography.Text
                      style={{color:'#00766c'}}>
                      Post by {item.author? item.author :'anonymous'}
                        </Typography.Text>
                      }
                        />
              
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
   
       </div>
       )}
  
 export default PostList;