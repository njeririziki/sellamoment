import React,{useEffect,useState} from 'react';
import {projectAuth} from '../Firebase/config'

const AdminContext = React.createContext();

const AdminProvider = ({children}) => {

    const [admin, setAdmin]= useState(false)

    useEffect(() => {
       const email = projectAuth.currentUser.email
       if(email==='admin@sellamoment.com'){
           setAdmin(true);
       }
    
    }, [])
    return ( 
        <AdminContext.Provider value={{admin}}>
            {children}
        </AdminContext.Provider>
     );
}
 
export default AdminProvider;

export {AdminContext}