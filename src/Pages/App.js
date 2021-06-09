import React, {useState} from 'react';
//import {Empty,Button} from 'antd'
import '../styles/App.css';
import CreatePost from '../Components/Modals/CreatePost'
import PageHeader from '../Components/Header'
import UserList from '../Components/List/UserList'
import AdminList from '../Components/List/AdminList'
//import {projectFirestore,firebase, projectAuth} from  './Firebase/config'

function App() {
const [visible,setVisible] =useState(false)


  return (
    <div className="App">
      <PageHeader subtitle='Dashboard'/>
     <div className='Content'>
       {/* <div>
       <Empty 
           description={ <p>You have no posts yet</p>}
        />
     <br/> <br/>
      <Button type='default'
        style={{ backgroundColor:'#88c399',color:'#ffffff' }}
      onClick={()=>setVisible(true)}>
        Create a post
      </Button>
       </div> */}
     
      <UserList/>
      <AdminList/>
       </div> 
     
      <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
    </div>
  );
}

export default App;
