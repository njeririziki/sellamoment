import React, {useState} from 'react';
import {Tag} from 'antd';
import List from './ArticlesList';
import CreatePost from '../Modals/CreatePost'
import {projectFirestore,projectStorage,firebase, projectAuth} from  '../..//Firebase/config'

const columns = [
    { title: 'Title', dataIndex: 'title', key: 'name',  },  
    { title: ' Date ', dataIndex: 'date', key: 'date', 
    sorter: (a,b)=> a.amount - b.amount, 
    sortOrder: 'descend',
    responsive: ['md'] },
 
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (tag,color)=> {
              if (tag === 'declined') {
                color = 'volcano';
              } 
              if(tag === 'approved'){ 
                  color ='green'}
                  if(tag === 'pending'){ 
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
        <a> Edit</a>,
        <a> Read</a>
        ), 
      },
    
  ];

const UserList = () => {
    const [visible, setVisible] = useState(false)
    const [values,setValues] = React.useState([])
      
      
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
                    status: doc.data().Status
                })
        
              setValues(goal) ; 
              });
            }    
          }); 
        } catch (error){
           alert(error)
        }   
      
      
      },[])

    return ( 
        <div>
        <List columns={columns} tableTitle='Blogs' buttonName='Create a Post' 
        openModal={()=>setVisible(true)} data={values}/>
         <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
        </div>
     );
}
 
export default UserList;