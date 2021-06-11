import React,{useEffect,useState} from 'react';
import {Row, Grid, Form, Space, Input, Button, message, Card, Typography} from 'antd';
import '../styles/SignIn.css'
import {UnlockOutlined,EyeOutlined,EyeInvisibleOutlined,QuestionCircleOutlined, } from '@ant-design/icons';
import {withRouter, Link, Redirect}  from 'react-router-dom'
import {projectAuth,projectFirestore} from '../Firebase/config'


//, VisibilityOutlined, VisibilityOffOutlined, ContactSupportOutlined

const {Item: FormItem} = Form;
const SignIn = ({history}) => {
    const [form] = Form.useForm();
    const initialValues = {};
    const screens = Grid.useBreakpoint();
    const [disable, setDisable] = React.useState(true);
  
    const [loading,setLoading]= useState(false)

    const onFinish = async(values)=>{
        setLoading(true)
        
            try {
                await projectAuth.createUserWithEmailAndPassword(values.email,values.password)
                .then(user=> {
                    console.log(user)
                    // user.updateProfile({
                    //     displayName: values.username
                    // })
                }).catch((err)=> console.log(`error creating user ${err}`));
    
                    message.success('Successfuly logged in')

        
        }catch(error){
           message.error(` Encountering ${error}`);
           console.log(`error creating user ${error}`)
        };
        setLoading(false)
            
    }

    const onFinishFailed=(errorInfo)=>{
    alert(`Failed to submit form ${errorInfo}`)
    }

    return (
             <Space size="large" direction="horizontal" className={'root'}>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    {...{initialValues}}
                     onFinishFailed={onFinishFailed}
                    requiredMark={false}
                    className={[screens.xs ? 'mobile-form' : 'desktop-form']}>
                    <FormItem style={{textAlign:'center'}}>
                     <UnlockOutlined className='icon'/>
                    </FormItem>
                    <FormItem
                        name="username"
                        label="Username"
                        rules={[{required: true, message: 'Username is required'}]}>
                        <Input size="large" placeholder="Username" />
                    </FormItem>

                    <FormItem
                        name="email"
                        label="Email"
                        rules={[{required: true,
                         type:'email',
                        message: 'email is required'}]}>
                        <Input size="large" placeholder="username@domain.com" />
                    </FormItem>

                    <FormItem
                        name="password"
                        label="Password"
                        rules={[{required: true, message: 'Password is required'}]}>

                        <Input.Password 
                        placeholder="Password" 
                        size="large" 
                        onChange={()=>setDisable(false)}
                           iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} 
                           />
                    </FormItem>
                
                    <FormItem
                        // className={styles[screens.xs ? 'mobile-button' : 'desktop-button']}
                    >
                        <Button
                            size="large"
                            type= 'primary'
                            disabled={ disable}
                            style={disable
                                ? { width:'max-content',}
                                : { width:'max-content',
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    boxShadow: 'none'}}
                            loading={loading}
                            htmlType="submit"
                           
                           >
                            Register
                        </Button>
                    </FormItem>
                    <FormItem >
                        <Typography.Text type='secondary'>
                             <b> Do you alredy have an account? </b><br/>
                        </Typography.Text>
                     <Link to ='/login'> 
                     <Typography>
                        Log In instead
                        </Typography>  
                     </Link>    
                    </FormItem>
                    
            
                </Form>
          




    </Space>
      
      );
}
 
export default withRouter(SignIn);