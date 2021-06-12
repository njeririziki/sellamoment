import React, {useState} from 'react';
import {Button, Divider} from 'antd'
import '../styles/App.css';
import CreatePost from '../Components/Modals/CreatePost'
import PageHeader from '../Components/Header'
import Unverified from '../Components/List/Unverified'
import AdminList from '../Components/List/AdminList'
import AdminProvider from '../Context/AdminContext'
import PostList from '../Components/List/PostList'


function App() {
const [visible,setVisible] =useState(false)


  return (
    <AdminProvider>
      <div className="App">
      <PageHeader subtitle='Dashboard' styles="Header"/>
     <div className='Content'>
       {/* <div>
       <Empty 
           description={ <p>You have no posts yet</p>}
        />
    
       </div> */}
    <PostList title= 'Recent Posts'/>
     <Divider  orientation='left' > My posts</Divider>
     <Button type='default' className="Button"
     style={{ alignSelf:'flex-end',backgroundColor:'#88c399',color:'#ffffff',}}
      onClick={()=>setVisible(true)}>
        create a post
      </Button>
      <Unverified  title='Posts'  openModal={visible}/>
      <br/> <br/>
     <AdminList title='Admin List'/>
       </div> 
     
      <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
 
    </div>
    </AdminProvider>
   
  );
}

export default App;
