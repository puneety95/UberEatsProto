import {Container,Row,Col,Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { server_url } from '../values';

function CustomerOrder()
{    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [orderStatus,setOrderStatus]=useState(7); 
    // TO change order status
    const [orderStatus2,setOrderStatus2]=useState({}); 
    const [statusValues,setStatusValues] =useState([{}]);
    const [orderValues,setOrderValues] =useState({});
    const [display,setDisplay] = useState(false);
    let id=localStorage.getItem('id');
    const status=(e)=>{

        setOrderStatus(e.target.value);
    
    }

    const status2=(e,id)=>{
        let status=e.target.value;
        let d={status , id}
        setOrderStatus2(d);
    }
let d=false;
let st={
    7:"All",
    1 : "Order Received",
    2:"Preparing",
    3:"On the way",
    4:"Delivered",
    5:"Pick up Ready",
    6:"Picked up"  
}
    useEffect(()=>{
      
          axios({
            method: "get",
            url: server_url+`/getRestOrders?id=${id}&status=${orderStatus}`,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            
          })
            .then((response) => {
               // setOrderStatus(response.data);
                console.log(response.data);
                setStatusValues(response.data); 
                setOrderValues(response.data);
            
            })
            .catch((error) => {
              console.log("There were some errors while fetching order status data");
            });
        },[orderStatus,display])


        const statusChange=()=>{
            //alert(orderStatus2);
            axios({
                method: "post",
                url: server_url+`/updateOrderStatus?`,
                headers: { "Content-Type": "application/json","Authorization": bearer  },
                data:{orderStatus2}
                
              })
                .then((response) => {
                   // setOrderStatus(response.data);
                   setDisplay(!display);
                    alert("Successfully updated the status");
                
                })
                .catch((error) => {
                    alert("THere were some erros while performing the task");
                  console.log("There were some errors while fetching order status data");
                });
        }

    console.log('----STATUS----', orderValues)
    return(
        <Container>

            <Row>
                <div className="col-sm-3">
            <label for="orderstatus" style={{fontSize:'x-larger',paddingTop:'20%'}}>Order Status:</label>
                <select name="orderstatus"  onChange={(e)=>{status(e)}} id="orderstatus">
                    <option value="1">New</option>
                    <option value="2">Delivered</option>
                    <option value="3">Cancelled</option>
                   
                </select>
                </div>
            </Row>
            <Row style={{paddingTop:'1%',paddingBottom:'2%'}}>
                <hr  className="one"></hr>

                
            </Row> 

      {
             Object.values(orderValues).map(order => {
                 const restName = order && order[0] && order[0].cust_name;
                 const restProfilePic = order && order[0] && order[0].profile_pic;
                 let date = order && order[0] && order[0].date;
                 date=new Date(date).toLocaleString();
                 const status = order && order[0] && order[0].status;
                let t_value=0;
                const mode = order && order[0] && order[0].mode;
                let o_id=  order && order[0] && order[0].id;
               
                 console.log('---ORDER----', order);

                     return (
                   <Row>
                    <div class="card mb-3" style={{marginTop:'2%'}}>
                     <div class="row no-gutters">
                         <div class="col-md-3" style={{paddingTop:'5%'}}>
                             {/* <img src={restProfilePic} style={{height:'100%',objectFit:'cover'}} class="card-img" alt="rest_image"/> */}
                        {  mode == 'Delivery' &&    <select name="order_status2"  defaultValue={0} onChange={(e)=>{status2(e,o_id)}} id="order_status2">
                              <option value="0">--Select Status--:</option>
                              <option value="1">Order Received</option>
                              <option value="2">Preparing</option>
                              <option value="3">On the way</option>
                              <option value="4">Delivered</option>
                              
                       </select>
                        }
                        {  mode == 'Pickup' &&    <select name="order_status2" defaultValue={0} onChange={(e)=>{status2(e)}} id="order_status2">
                             
                             <option value="1">Order Received</option>
                             <option value="2">Preparing</option>
                             <option value="5">Pick up Ready</option>
                             <option value="6">Picked up</option>
                           
                      </select>
                       }


                       <Button onClick={statusChange} style={{backgroundColor:'black'}}>Change Status  </Button>
                         </div>
                         <div class="col-md-6">
                           <div class="card-body">
                           <h5 class="card-title">{restName}</h5>
                            
                               <p class="card-text" style={{textDecoration:'underline'}}><small >Date - {date}</small></p> 
                              {order && order.map(item => {
                                  t_value=t_value + item.cost * item.quantity
                                  return (
                                      <div>
                                       <Row>   
                                           <p>{item.name}  ${item.cost} x {item.quantity} </p>
                                      
                                      </Row>
                                 
                                  </div>
                                  )
                              })}
                          </div>
                        </div>
                        <div className='col-md-2'>
                              <h5 style={{paddingTop:'10%'}}>Total - ${t_value}</h5>
                              <Button style={{backgroundColor:'black'}}>View Profile </Button>
                              <h6 style={{paddingTop:'10%'}}>Order Status - {st[status]}</h6>
                            </div>
                        </div>
                    </div>              
                    </Row>
                            
                 )
            })
         }

        
        </Container>
    )
}
export default CustomerOrder;