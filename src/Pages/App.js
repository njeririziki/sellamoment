import React, {useState} from 'react';
import {Empty,Button, Divider} from 'antd'
import '../styles/App.css';
import CreatePost from '../Components/Modals/CreatePost'
import PageHeader from '../Components/Header'
import Unverified from '../Components/List/Unverified'
import AdminList from '../Components/List/AdminList'
import AdminProvider from '../Context/AdminContext'
import PostList from '../Components/List/PostList'
//import {projectFirestore,firebase, projectAuth} from  './Firebase/config'

function App() {
const [visible,setVisible] =useState(false)


  return (
    <AdminProvider>
      <div className="App">
      <PageHeader subtitle='Dashboard'/>
     <div className='Content'>
       {/* <div>
       <Empty 
           description={ <p>You have no posts yet</p>}
        />
    
       </div> */}
    <PostList title= 'Recent Posts'/>
     <Divider  orientation='left' > My posts</Divider>
      <Unverified  title='Posts' buttonName='create a post' openModal={visible}/>
      <br/> <br/>
     <AdminList title='Admin List'/>
       </div> 
     
      <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
 
    </div>
    </AdminProvider>
   
  );
}

export default App;
