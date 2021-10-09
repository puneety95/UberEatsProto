import {Container,Row,Col} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';

function CustomerOrder()
{    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [orderStatus,setOrderStatus]=useState(7);
    const [statusValues,setStatusValues] =useState([{}]);
    let id=localStorage.getItem('id');
    const status=(e)=>{

        setOrderStatus(e.target.value);
    
    }

    useEffect(()=>{
      
          axios({
            method: "get",
            url: `http://localhost:4000/getCustOrders?id=${id}&status=${orderStatus}`,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            
          })
            .then((response) => {
                alert("success");
                console.log(response.data);
                setStatusValues(response.data)
            
            })
            .catch((error) => {
              console.log("There were some errors while fetching order status data");
            });
        },[orderStatus])


    
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
        </Container>
    )
}
export default CustomerOrder;