import React,{useState} from 'react'
import { Grid,Table,Typography,Descriptions,Button} from 'antd';


 const NestedTable =({columns,data,tableTitle,pageSize,openModal,buttonName}) => {
    const screens = Grid.useBreakpoint()
    const [expandedRow, setExpandedRow] = useState()
    const onExpand=(expanded,record)=>{
      console.log('it rendered before')
      let keys=[]
      if(expanded){
        keys.push(record.key);
        setExpandedRow(keys);
        console.log('it rendered onExpand')
      }
      console.log('it rendered after')
    }
    return (
        <div>
              <div style={{  display:'flex',justifyContent:'space-between',
              alignItems:'center' ,paddingLeft:' 2em '}}>
         <Typography.Title level={5}>
             {tableTitle}
             </Typography.Title>   
        <Button
        style={{ alignSelf:'flex-end',backgroundColor:'#88c399',color:'#ffffff',}}
        
        type='default'
        onClick={openModal}
       // icon={<Plus size={'1em'}/>}
       >
         {buttonName}
        </Button>
        </div>
  <Table
         //style={{backgroundColor:''}}
        columns={columns}
        expandedRowKeys={expandedRow}
        onExpand={()=>onExpand}
        expandable={{   
         expandedRowRender:  screens.xs? (item=> 
          <Descriptions key={item.key} title='Details' size='small'> 
           {item.location? <p>Location:{item.location}</p>: null}
           <Descriptions.Item label='Account'> {item.client}</Descriptions.Item> 
           {item.name? <Descriptions.Item label='Name'>  {item.name}</Descriptions.Item>: null}
           {item.reference_number? <Descriptions.Item label='UserID'>  {item.reference_number}</Descriptions.Item>: null}
           {item.date? <Descriptions.Item label='Date '>{item.date}</Descriptions.Item>: ''}
           {item.status? <Descriptions.Item label='Status'> {item.status}</Descriptions.Item>: ''}
           {item.description? <Descriptions.Item label='Description '> {item.description}</Descriptions.Item>:''}
          </Descriptions>):
           (item=>
            <Descriptions title='Details' >
            <Descriptions.Item label='Description '>{item.description}</Descriptions.Item>
            </Descriptions> )
        }}
        dataSource={data}
        pagination={{pageSize:pageSize}}
      />
        </div>
    
    );
  }

  export default NestedTable;