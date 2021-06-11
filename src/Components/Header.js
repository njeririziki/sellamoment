import React, {useContext,useState,useEffect} from 'react';
import {PageHeader,Button} from 'antd'
import {AdminContext} from '../Context/AdminContext'
import {Link, useLocation,withRouter } from 'react-router-dom'
import { projectAuth } from '../Firebase/config';


const Header = ({subtitle}) => {
    const {admin}= useContext(AdminContext)
    const [userDash, setUserDash] = useState(true)
      const location = useLocation()

      useEffect(() => {
         
          if(location.pathname === '/admin'){
              setUserDash(false)
          }

      }, [location])
     
    return ( 
    <div style={{backgroundColor:'#ecfffd'}}>
    <PageHeader
    title= 'Sellamoment'
    subtitle={subtitle}
    extra={
        admin? [ 
            <Link to= { userDash?'/admin' :'/'}>
                <Button type='default' >
            {userDash? 'Log In as Admin': 'Log in as user'}
              </Button>
            </Link>
           
    ] :  <Button type='default' 
         onClick={()=> projectAuth.signOut()}>
        Log out
    </Button> } 
    />    
 
    </div> );
}
 
export default withRouter(Header);


// if (values.email === 'admin@sellamoment.com'){
//     return history.push("/admin")
//   }