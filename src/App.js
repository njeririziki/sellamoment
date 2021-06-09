import React, {useState} from 'react';
import {Empty,Button} from 'antd'
import './App.css';
import CreatePost from './Components/Modals/CreatePost'
import PageHeader from './Components/Header'

function App() {
const [visible,setVisible] =useState(false)

  return (
    <div className="App">
      <PageHeader subtitle='Dashboard'/>
     <div className='Content'>
     <Empty 
     description={ <p>You have no posts yet</p>}
     />
     <br/> <br/>
      <Button type='primary'
      onClick={()=>setVisible(true)}>
        Create a post
      </Button>
       </div> 
 
      <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
    </div>
  );
}

export default App;
