import React, {useState} from 'react';
import {Tag,message} from 'antd';
import List from './Unverified';
import CreatePost from '../Modals/CreatePost'
import {projectFirestore, projectAuth} from  '../..//Firebase/config'



const UserList = () => {
    const [visible, setVisible] = useState(false)
    const [values,setValues] = useState([])
      
      
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
                    status: doc.data().Status,
                    key: doc.id,
                })
               
              setValues(goal) ; 

              });
            }    
          }); 
        } catch (error){
           alert(error)
        }   
      
      
      },[])
  
        const onFinish = async (values) => {
          console.log(values);
           const user= projectAuth.currentUser.uid
            if(user ) {
             console.log( `User is ${user}`)
            } 
           try{
               await projectFirestore.collection('Blogs').doc(user).set({
                 Title: values.title,
                 Author:values.authorname,
                 Content:values.content,
                 Status: 'pending'
               })
               //onCancel();
               message.success('RePost successful')
     
           }catch(error) {
               message.error(`error uploading doc ${error}`)
           }
         }
        

    return ( 
        <div>
        <List title=' My Posts'  data={values}/>
        
         <CreatePost visible={visible} onCancel={()=>setVisible(false)}/>
        </div>
     );
}
 
export default UserList;



