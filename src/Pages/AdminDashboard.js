import React, {useState} from 'react';
import {Button,Divider} from 'antd'
import '../styles/App.css';
import PageHeader from '../Components/Header'
import AdminList from '../Components/List/AdminList'
import AdminProvider from '../Context/AdminContext'
import { projectAuth} from  '../Firebase/config'

function AdminDash() {

   
const logOut =()=>{
  projectAuth.signOut()  
}

  return (
    <AdminProvider>
      <div className="App">
      <PageHeader subtitle='Dashboard'/>
     <div className='Content'>
      <AdminList title='Recent Posts'/>
     <Divider/>
      <Button type='primary' className="Button"
         onClick={logOut}>
                    Log out
           </Button> 
       </div> 
  
    </div>
    </AdminProvider>
   
  );
}

export default AdminDash;



