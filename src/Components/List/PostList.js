import React, {useState} from 'react';
import {  Tooltip, List, Avatar, Typography } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom'
import { StarOutlined } from '@ant-design/icons';
import {projectFirestore, projectAuth} from  '../../Firebase/config'



const PostList = ({title}) => {
   const [ellipsis,setEllipsis] = useState( false)
   const [values,setValues] = useState([])


   React.useEffect(()=>{
    const unsub = projectFirestore.collection('Posts') 
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
          <List.Item key={item.key}
          // actions={[  <Link to='/'>
          //           <a>Manage</a>
          //           </Link>]}
          >
              <List.Item.Meta 
             avatar= {<Avatar 
              size={64} icon={<StarOutlined />} />}
              title={item.title}  
                     
              description= {
                <Typography.Text style={{color:'#00766c'}}>
             Post by {item.author? item.author :'anonymous'}
              </Typography.Text>
             }
              />
               <Typography.Paragraph 
                ellipsis={
                  ellipsis
                    ? {
                        rows: 2,
                        expandable: true,
                        symbol: 'more',
                      }
                    : false
                }>
                {item.content}
                </Typography.Paragraph>
              
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

// renderItem={item => (
//   <li>
//     <Comment
//       actions={item.actions}
//       author={item.author}
//       avatar={item.avatar}
//       content={item.content}
//       datetime={item.datetime}
//     />
//   </li>
// )}