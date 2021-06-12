import React from 'react';
import { Modal, Form, Input,message } from 'antd';
import {projectFirestore,projectAuth,date} from  '../../Firebase/config'

const CreatePost = ({visible,onCancel}) => {
    const [form] = Form.useForm();
  

    const onFinish = async (values) => {
     console.log(values);
      const {uid, displayName}= projectAuth.currentUser
      
      try{
          await projectFirestore.collection('Posts').add({
            Title: values.title,
            Author: displayName,
            Content:values.content,
            Status: 'pending',
            createdAt: date ,
            uid
          })
          onCancel();
          message.success('Post successful')

      }catch(error) {
          message.error(`error uploading doc ${error}`)
      }
    }
    return (
        <Modal
          visible={visible}
          title=" Upload Article"
          okText=" Post"
          cancelText="Cancel"
          onCancel={()=>{
            form.resetFields();
            onCancel()
          }}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onFinish(values);
                onCancel();
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
                onCancel();
              });
          }}
        >
       <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
          >
              
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please fill this field',
                },
              ]}
            >
              <Input type='text' />
            </Form.Item>
           
          <Form.Item
            label="Write post"
            name="content"
          >
            <Input.TextArea 
            rows={4} 
            showCount 
            allowClear 
            autoSize={{ minRows: 4, maxRows: 8}} />
          </Form.Item>
          
       
            
          </Form>
                 
        </Modal>
      );
}
 
export default CreatePost;

// I keep this code here just incase there should be need to import a document
   /* <Form.Item name="document" label=" Import Article" 
           rules={[
            {
              required: false,
              message: 'Please import a file',
            },
          ]}>
            <label style={{ display:'flex', flexDirection:'row',
            border:'1px solid #cfd8dc',padding: '0.5em 0.5em 0.5em 1em'}}>
            {loading? <LoadingOutlined style={{fontSize:'18px'}}/>:<UploadOutlined />}
          
            <Input type='file' 
             style={{width:0,height:0,opacity:0}}
            // onChange={upload} 
              /> 
               Import Document 
            </label> 
            </Form.Item>*/
          