import React, {useState} from 'react';
//import {Empty,Button} from 'antd'
import '../styles/App.css';
import CreatePost from '../Components/Modals/CreatePost'
import PageHeader from '../Components/Header'
import AdminList from '../Components/List/AdminList'
import AdminProvider from '../Context/AdminContext'
//import {projectFirestore,firebase, projectAuth} from  './Firebase/config'

function AdminDash() {
const [visible,setVisible] =useState(false)


  return (
    <AdminProvider>
      <div className="App">
      <PageHeader subtitle='Dashboard'/>
     <div className='Content'>
    
      <AdminList title='Recent Posts'/>

       </div> 
     
      <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
    </div>
    </AdminProvider>
   
  );
}

export default AdminDash;



