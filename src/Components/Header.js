import React from 'react';
import {PageHeader,Button} from 'antd'

const Header = ({title}) => {
    return ( 
    <div style={{backgroundColor:'#ecfffd'}}>
    <PageHeader
    title= 'Sellamoment'
    subtitle={title}
    extra={[
        <Button
        onClick={console.log('go to admin')}>
            Log In as Admin
        </Button>
    ]}
    />    

    </div> );
}
 
export default Header;