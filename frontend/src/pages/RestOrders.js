import {Container,Row,Col,Button,Modal} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import * as FiIcons from 'react-icons/bi';
import { server_url } from '../values';
import Pagination from '../components/Pagination';

function CustomerOrder()
{    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [orderStatus,setOrderStatus]=useState(1); 
    // TO change order status
    const [orderStatus2,setOrderStatus2]=useState({}); 
    const [statusValues,setStatusValues] =useState([{}]);
    const [orderValues,setOrderValues] =useState([]);
    const [display,setDisplay] = useState(false);
    const [showReceipt,setShowReceipt] = useState();
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(true);
    const [currentPage,setCurrentPage] =useState(1);
    const [postsPerPage,setPostsPerPage] = useState(5);
  const handleShow = () => setShow(true);
    let id=localStorage.getItem('id');
    const status=(e)=>{

        setOrderStatus(e.target.value);
    
    }
    const setShowReceiptmodal=(id)=>{
        handleShow();
        setShowReceipt(id);
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
    6:"Picked up",
    8:"Cancelled"  
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
        const changePerPageOrder =(e)=>{
          if(e.target.value!=0){
            setPostsPerPage(e.target.value);
          }
         
      }

      //Get current posts
      const indexOfLastPost = currentPage * postsPerPage;
      const indexofFirstPost = indexOfLastPost - postsPerPage;
      const currentOrders=orderValues.slice(indexofFirstPost,indexOfLastPost); 
 
      const paginate = pageNumber => setCurrentPage(pageNumber);
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
            <Row>
                <div className="col-sm-12 text-end">
                <label for="ordersperpage" style={{fontSize:'x-larger'}}>Order Per Page:</label>
                <select name="ordersperpage"  onClick={(e)=>{changePerPageOrder(e)}} id="ordersperpage">
                    <option value="0">Select Value</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                   
                </select>
                </div>
            </Row> 
            <Row>
            <div className="col-sm-12 text-end" style={{paddingTop:'1%'}}>
            <Pagination
                 postsPerPage={postsPerPage}
                 totalPosts={orderValues.length}
                paginate={paginate}
           />
           </div>
            </Row>

      {
             Object.values(currentOrders).map(order => {
                 const custName = order.cust_name;
                 const restProfilePic = order.rest_profile_pic;
                 let date = order.date;
                 date=new Date(date).toLocaleString();
                 const status = order.status;
                let t_value=0;
                const mode = order.mode;
                let o_id=  order.id;
                let instruction=order.instruction;
               
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
                              <option value="8">Cancelled</option>
                              
                       </select>
                        }
                        {  mode == 'Pickup' &&    <select name="order_status2" defaultValue={0} onChange={(e)=>{status2(e,o_id)}} id="order_status2">
                             <option value="0">--Select Status--:</option>
                             <option value="1">Order Received</option>
                             <option value="2">Preparing</option>
                             <option value="5">Pick up Ready</option>
                             <option value="6">Picked up</option>
                             <option value="8">Cancelled</option>
                           
                      </select>
                       }


                       <Button onClick={statusChange} style={{backgroundColor:'black'}}>Change Status  </Button>
                         </div>
                         <div class="col-md-6">
                           <div class="card-body">
                           <h5 class="card-title">{custName}</h5>
                            
                               <p class="card-text" style={{textDecoration:'underline'}}><small >Date - {date}</small></p>
                               <p class="card-text" style={{textDecoration:'underline'}}><small >Mode - {mode}</small></p>  
                               <p class="card-text" onClick={()=>{setShowReceiptmodal(o_id)}} style={{textDecoration:'underline',cursor:'pointer'}}><small >View Receipt</small></p>
                              {order && order.order_item.map(item => {
                                  t_value=parseFloat(t_value + item.cost * item.quantity).toFixed(2);
                                  return (
                                      <div>
                                       <Row>   
                                           <p>{item.name}  ${item.cost} x {item.quantity} </p>
                                      
                                      </Row>
                                      {showReceipt==o_id && 
                                            <Modal show={show} onHide={handleClose}>
                                                 <Modal.Header >
                                              <Modal.Title>Receipt - {custName}</Modal.Title>
                                              <div><b>Order ID-</b> {o_id}</div>
                                            </Modal.Header>
                                            <Modal.Body>

                                            <Row>   
                                           {/* <p>Spicy Chicken $15.79 x 1</p> */}
                                          < div className='col-sm-10'>
                                            <FiIcons.BiFoodTag/>  {item.name}  ${item.cost} x {item.quantity} 
                                               </div>
                                               <div className='col-sm-2'>
                                               {parseFloat(item.cost *  item.quantity).toFixed(2)} 
                                               </div>
                                            
                                             </Row>
                                             <Row>
                                             <Row style={{paddingTop:'1%',paddingBottom:'2%'}}>
                                                <hr  className="one"></hr>
                                                   </Row> 
                                             <h6 style={{paddingTop:'1%'}}>Special Instructions</h6>
                                             <p>{instruction}</p>
                                             </Row>
                                             <Row style={{paddingTop:'1%',paddingBottom:'2%'}}>
                                                <hr  className="one"></hr>
                                                   </Row> 
                                             <Row>
                                             <h5 style={{paddingTop:'5%'}}>Total - ${t_value}</h5>
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