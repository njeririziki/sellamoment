import React, {useState} from 'react';
import {  Tooltip, List, Avatar, Typography } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom'
import { StarOutlined } from '@ant-design/icons';

const data = [
  {
    title:' Dreams',
    author: 'Njeri Kariuki',
    avatar: '',
    content: ( <p> Experts believe that daydreaming could be the product of a collection of 
    brain regions known as the default mode network. </p> ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    title: 'Defaults network mode',
    author: 'Njeri Kariuki',
    avatar: '',
    content: (
      <p>
       The default mode network is important in producing conscious experiences, and some research has 
       shown it to increase in activity when someone is daydreaming.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

const PostList = ({title}) => {
   const [ellipsis,setEllipsis] = useState( false)
    return (
        <div>
        <List
     
        header={ <Typography.Title level={4}>
                   {title}
        </Typography.Title>}
        itemLayout="vertical"
        dataSource={data}
        renderItem={item=> (
          <List.Item key={item.key}
          // actions={[  <Link to='/'>
          //           <a>Manage</a>
          //           </Link>]}
          >
              <List.Item.Meta 
             avatar= {<Avatar 
              size={64} icon={<StarOutlined />} />}
              title={  <Typography.Title level={5}>
                      {item.title}  
                       </Typography.Title>
                    }
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