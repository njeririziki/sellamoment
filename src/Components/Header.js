import React, {useContext} from 'react';
import {PageHeader,Button} from 'antd'
import {AdminContext} from '../Context/AdminContext'
import {Link } from 'react-router-dom'

const Header = ({subtitle}) => {
    const {admin}= useContext(AdminContext)

    return ( 
    <div style={{backgroundColor:'#ecfffd'}}>
    <PageHeader
    title= 'Sellamoment'
    subtitle={subtitle}
    extra={
        admin? [
            <Link to='/admin'>
                <Button >
            Log In as Admin
              </Button>
            </Link>
    ] : ''}
    />    

    </div> );
}
 
export default Header;


// if (values.email === 'admin@sellamoment.com'){
//     return history.push("/admin")
//   }