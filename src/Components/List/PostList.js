import React, {useState} from 'react';
import {  List, Avatar, Typography } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import {projectFirestore} from  '../../Firebase/config'



const PostList = ({title}) => {
  
   const [values,setValues] = useState([])

   React.useEffect(()=>{
    const unsub = projectFirestore.collection('VerifiedPosts') 
        .orderBy('date','desc').limit(5)
           .onSnapshot((docSnapshot)=>{
            const post=[];
           docSnapshot.docs.forEach((doc)=>{
                post.push({
                    title:  doc.data().title,
                    author:doc.data().author,
                    content:doc.data().content,
                    postTime:doc.data().postTime,
                    key: doc.id
                  })  
              });
              setValues(post) ; 
          },(error)=>  console.log(`${error} postList`))   
      return () => unsub();
    },[])

    return (
        <div>
        <List
        header={ <Typography.Title level={4}>
                   {title}
        </Typography.Title>}
        itemLayout="vertical"
        dataSource={values}
        renderItem={item=> (
          <List.Item key={item.key} >
              <List.Item.Meta 
             avatar= {<Avatar 
              size={64} icon={<StarOutlined />} />}
              title={item.title}  
                     
              description= {
                <Typography.Text style={{color:'#00766c'}}>
             Post by {item.author? item.author :'anonymous'} <br/> 
             {item.postTime}
              </Typography.Text>
             }
              />
               <Typography.Paragraph >
                {item.content}
                </Typography.Paragraph>
 
              </List.Item>)}
   
      />
      </div>
      )}
 
export default PostList;

