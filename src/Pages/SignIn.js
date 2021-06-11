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

    // useEffect(() => {
    //  if(loading){
    //      setLoad(true)
    //  }
    //  if(loggedIn){
    //      router.push('/')
    //  }
    // }, [loggedIn,loading])
    const onFinish = async(values)=>{
        setLoading(true)
        
            try {
                await projectAuth.signInWithEmailAndPassword(values.email,values.password);
    
                     history.push("/");
                    message.success('Sucessfuly logged in')
 
        }catch(error){
           message.error(` Encountering ${error}`);

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
                        name="email"
                        label="email"
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
                            Sign in 
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Typography.Text type='secondary'> <b>Forgot password? </b><br/>
                        </Typography.Text>
                        <Typography.Link >
                        <QuestionCircleOutlined className='icon'/>
                         Please contact support 
                        </Typography.Link>     
                    </FormItem>
                    <FormItem>
                    <Link to ='/signup'> 
                    <Typography>
                            Create an account
                        </Typography>
                   
                    </Link>
                    </FormItem>   
            
                </Form>

    </Space>
      
      );
}
 
export default withRouter(SignIn);