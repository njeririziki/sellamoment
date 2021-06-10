import React, {useState} from 'react';
//import {Empty,Button} from 'antd'
import '../styles/App.css';
import CreatePost from '../Components/Modals/CreatePost'
import PageHeader from '../Components/Header'
import UserList from '../Components/List/UserList'
import AdminList from '../Components/List/AdminList'
import AdminProvider from '../Context/AdminContext'
import PostList from '../Components/List/PostList'
//import {projectFirestore,firebase, projectAuth} from  './Firebase/config'

function AdminDash() {
const [visible,setVisible] =useState(false)


  return (
    <AdminProvider>
      <div className="App">
      <PageHeader subtitle='Dashboard'/>
     <div className='Content'>
      
     <PostList/>
      
      <AdminList/>

       </div> 
     
      <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
    </div>
    </AdminProvider>
   
  );
}

export default AdminDash;



