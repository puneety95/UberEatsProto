import {Container,Row,Col,Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { server_url } from '../values';

function RestOrders()
{
        let id=localStorage.getItem('id');
        let bearer= 'Bearer '+localStorage.getItem('accessToken'); 

        const [filter,setFilter] = useState({"new_order":false,"delivered":false,"cancelled":false});
        

        useEffect(()=>{
            axios({
                method:'get',
                url:server_url+`\RestOrderDetails?id=${id}`,
                headers: { "Content-Type": "application/json","Authorization": bearer  }
            }).then((response)=>{
                console.log("Success");
              })
              .catch((error) => {
                console.log((error.response));
              });

        },[filter]);


        const handleUpdateChange=(e)=>  
        {
            const {name ,checked}=e.target;   
            setFilter({
              ...filter,
              [name] :checked
            });
        }

        console.log("VAlues=>",filter);




    return(
        <Container>
            <Row style={{paddingTop:'3%'}}>
                <div className='col-sm-2'>
                    <input type="checkbox" onChange={(e)=>{handleUpdateChange(e)}} value="new_order" name="new_order"/>
                    <label for ="new_order">New Order</label>
                </div>
                <div className='col-sm-2'>
                    <input type="checkbox"  onChange={(e)=>{handleUpdateChange(e)}} value="delivered" name="delivered"/>
                    <label for ="delivered_order">Delivered</label>
                </div>
                <div className='col-sm-2'>
                    <input type="checkbox"  onChange={(e)=>{handleUpdateChange(e)}} value="cancelled" name="cancelled"/>
                    <label for ="cancelled_order">Cancelled</label>
                </div>
            </Row>
            <Row>
                <hr className="one"></hr>
            </Row>


            <Row>
                <div className='col-sm-3'>
                    <div><b>Order Id</b></div>
                    <div> 
                        <select name="cars" id="cars">
                            <option value="1">Recived</option>
                            <option value="1">Preparing</option>
                            <option value="3">Delivered</option>
                            <option value="4">On the way</option>
                        </select>
                    </div>
                    <div>
                     <Button style={{marginTop:'1%',backgroundColor:'grey'}}>Update</Button>
                    </div>

                </div>    
                <div className='col-sm-2'>
                    Current Status    
                </div> 
                <div className='col-sm-5'>
                    Puneet    
                </div> 
                     
                <div className='col-sm-2'>
                  <Button style={{backgroundColor:'black'}}>Customer</Button>   
                </div>    

            </Row>

        </Container>


    )

}

export default RestOrders;