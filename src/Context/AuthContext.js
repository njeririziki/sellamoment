import React,{useEffect} from 'react';
import Firebase from '@/firebase/config'

const AuthContext = React.createContext();

const AuthProvider = ({children})=>{
    
    const [user,setUser] = React.useState(null);
  

    useEffect (()=>{
        Firebase.auth().onAuthStateChanged(setUser) 
        
    },[]);
    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
    }
 export default AuthContext;
 export {AuthProvider}