import {Container,Row,Col,Button,Modal} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { server_url } from '../values';
function CustomerOrder()
{    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [orderStatus,setOrderStatus]=useState(7);
    const [statusValues,setStatusValues] =useState([{}]);
    const [orderValues,setOrderValues] =useState({});
    const [showReceipt,setShowReceipt] = useState();
    let id=localStorage.getItem('id');
    const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const status=(e)=>{

        setOrderStatus(e.target.value);
    
    }
    const setShowReceiptmodal=(id)=>{
        handleShow();
        setShowReceipt(id);
    }

    let st={
               7:"All",
               1 : "Order Received",
               2:"Preparing",
               3:"On the way",
               4:"Delivered",
               5:"Pick up Ready",
               6:"Picked up"  
           }

let d=false;
    useEffect(()=>{
      
          axios({
            method: "get",
            url: server_url+`/getCustOrders?id=${id}&status=${orderStatus}`,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            
          })
            .then((response) => {
              //  setOrderStatus(response.data);
              
               console.log("VALUESSSS OF THE OREDER ARE --->",response.data);
                setStatusValues(response.data);
                setOrderValues(response.data);
            
            })
            .catch((error) => {
              console.log("There were some errors while fetching order status data");
            });
        },[orderStatus])


    console.log('----STATUS----', orderValues)
    return(
        <Container>

            
            <Row>
                <div className="col-sm-3">
            <label for="order_status" style={{fontSize:'x-larger',paddingTop:'20%'}}>Order Status:</label>
                <select name="order_status"  onChange={(e)=>{status(e)}} id="order_status">
                    <option value="7">All</option>
                    <option value="1">Order Received</option>
                    <option value="2">Preparing</option>
                    <option value="3">On the way</option>
                    <option value="4">Delivered</option>
                    <option value="5">Pick up Ready</option>
                    <option value="6">Picked up</option>
                </select>
                </div>
            </Row>
            <Row style={{paddingTop:'1%',paddingBottom:'2%'}}>
                <hr  className="one"></hr>

                
            </Row> 

      {
             Object.values(orderValues).map(order => {
                 const restName = order.rest_name;
                 const restProfilePic =order.rest_profile_pic;
                 let date = order.date;
                date=new Date(date).toLocaleString()
                 const status = order.order_status;
                 const id=order && order[0] && order[0].id;
                // const id = order && order[0] && order[0].id;
                 let t_value=0;
               
                 console.log('---ORDER----', order);

                     return (
                   <Row>
                    <div class="card mb-3" style={{marginTop:'2%'}}>
                     <div class="row no-gutters">
                         <div class="col-md-3">
                             <img src={restProfilePic} style={{height:'100%',objectFit:'cover'}} class="card-img" alt="rest_image"/>
                         </div>
                         <div class="col-md-6">
                           <div class="card-body">
                           <h5 class="card-title">{restName}</h5>
                            
                               <p class="card-text" style={{textDecoration:'underline'}}><small >Date - {date}</small></p> 
                               <p class="card-text" onClick={()=>{setShowReceiptmodal(id)}} style={{textDecoration:'underline',cursor:'pointer'}}><small >View Receipt</small></p>
                              {order && order.order_item.map(item => {
                                 t_value=parseFloat(t_value + item.cost * item.quantity).toFixed(2);
                                  return (
                                      <div>
                                       <Row>   
                                           <p>{item.name}  ${item.cost} x {item.quantity} </p>
                                      
                                      </Row>
                                         {showReceipt==id && 
                                            <Modal show={show} onHide={handleClose}>
                                                 <Modal.Header >
                                              <Modal.Title>Receipt - {restName}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>

                                            <Row>   
                                           {/* <p>Spicy Chicken $15.79 x 1</p> */}
                                             <p>{item.name}  ${item.cost} x {item.quantity} </p>
                                             </Row>
                                             <Row>
                                             <h5 style={{paddingTop:'10%'}}>Total - ${t_value}</h5>
                                             </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                              <Button variant="secondary" onClick={handleClose}>
                                                Close
                                              </Button>
                                              
                                            </Modal.Footer>
                                          </Modal>
                                        
                                        
                                        
                                        } 
                                  </div>
                                  )
                              })}
                          </div>
                        </div>
                        <div className='col-md-2'>
                              <h5 style={{paddingTop:'10%'}}>Total - ${t_value}</h5>
                              <Button style={{backgroundColor:'black'}}>View Store</Button>
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