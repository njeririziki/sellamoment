import React, {useState, useEffect} from 'react';
import {Tag} from 'antd';
import List from './ArticlesList';
import CreatePost from '../Modals/CreatePost'
import {projectFirestore,projectStorage,firebase, projectAuth} from  '../..//Firebase/config'

const columns = [
    { title: 'Author', dataIndex: 'user', key: 'user',  },  
    { title: 'Title', dataIndex: 'Title', key: 'title',  },  
    { title: ' Date ', dataIndex: 'Date', key: 'date', 
    sorter: (a,b)=> a.amount - b.amount, 
    sortOrder: 'descend',
    responsive: ['md'] },
 
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (tag,color)=> {
              if (tag === 'Declined') {
                color = 'volcano';
              } 
              if(tag === 'Approved'){ 
                  color ='green'}
                  if(tag === 'Pending'){ 
                    color ='blue'}
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              );
            },
       filters: [
        {
          text: 'Approved',
          value: 'approved',
        },
        {
            text: 'Pending',
            value: 'pending',
          },
        {
          text: 'Declined',
          value: 'declined',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      },
      {
        title: 'Action', key: 'action',
        render: (text, record) => (
        //<Link href='/client_id' as={`/client_${record.key}`}>  </Link>   
        <a> Read</a>
       
        ), 
      },
      {
        title: 'Action', key: 'action',
        render: (text, record) => (
        //<Link href='/client_id' as={`/client_${record.key}`}>  </Link>   
        <a> Edit</a>
       
        ), 
      },
    
  ];

const UserList = () => {
    const [visible, setVisible] = useState(false)
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = projectFirestore.collection('Blogs')
          .orderBy('date')
          .onSnapshot(snap => {
            let documents = [];
            snap.forEach(doc => {
              documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
          });
    
        return () => unsub();
        // this is a cleanup function that react will run when
        // a component using the hook unmounts
      }, []);

    return ( 
        <div>
        <List columns={columns} tableTitle='Blogs' buttonName='Create a Post' 
        openModal={()=>setVisible(true)} data={docs} />
         <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
        </div>
     );
}
 
export default UserList;