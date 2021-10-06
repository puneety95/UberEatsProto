import {Container,Navbar,Button,Row,Nav} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import brandlogo from "../brand.svg";
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';
import SideDrawer from "../SideDrawer";
import BackDrop from "../BackDrop";
import {useCart} from "react-use-cart";
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';


function Checkout()
{
    const history=useHistory();
    const [sideDrawerView,setSideDrawerView] =useState(false);
    const [qty,ChangeQty]  =useState(true);
    const [totalBill,setTotalBill] = useState();
    const [totalAfterTax,setTotalAfterTax] = useState();
 
    const { items } = useCart();
    console.log("Puneeeeeeeeeeeeeeeeeeeeeeeeeeee",items);
    let tax=3;
    let delivery_fee=2;
    let ca=1;

    const changeQty=(item_id,value)=>{
      for(let i in items)
      {
          if(items[i].id==item_id)
          {
            items[i].quantity=value;
            setTotalBill(total);
            ChangeQty(!qty);
  
          }  
      }
  
    }

    let total=0;
    for(let i in items)
    {
         total=total+items[i].price * items[i].quantity;
    }
    useEffect(()=>{
      setTotalBill(total);
      let t=total + tax+delivery_fee + ca;
      setTotalAfterTax(t);

         },[]);
   
    const goToHome=()=>{
        history.push('/home')
      }
      const closeSideDrawerHandler=()=>{
        setSideDrawerView(false);
      }

      const sd_click_handler=()=>{
        setSideDrawerView((prevState)=>{
          return (!prevState)
        });   
      }

    return(
        <Container style={{margin:'0',padding:'0'}} fluid>
            
            {sideDrawerView && <SideDrawer/>}
            {sideDrawerView && <BackDrop closeSideDrawer={closeSideDrawerHandler}/>}
            <Navbar style={{zIndex:'900',margin:'0%'}} bg="light" >
        
        <Nav id="space2">
          <Button onClick={sd_click_handler}>
            <FaIcons.FaBars />{" "}
          </Button>
        </Nav>
        <Nav id="space">
          <Navbar.Brand style={{cursor:'pointer'}}>
            <img onClick={goToHome}
              width="146px"
              height="24px"
               className="img-responsive"
              src={brandlogo}
              alt="logo"
            />
          </Navbar.Brand>
        </Nav>
        
      </Navbar>

      <Row>
        <div style={{fontSize:'36px',fontWeight:'500',paddingLeft:'9%',paddingTop:'3%',fontFamily:'sans-serif'}}><b>{items[0].n}</b>
          </div>  
      </Row>

      <Row style={{paddingTop:'0%',paddingBottom:'3%'}}>
                <hr  className="one"></hr>
            </Row>  


           

      <ul>
        {items.map((item) => (  
         
             <Container >
             <Row style={{paddingTop:'1%'}}>
           
           
               <div style={{paddingLeft:'4%',lineHeight:'20px',fontSize:'x-large',fontFamily:'sans-serif '}} className='col-sm-3'>
                <b> {item.name}</b>
                

               </div>
              
               <div className='col-sm-2 text-right'>
                <FiIcons.FiDollarSign/> {item.price * item.quantity}
               </div>
             </Row>
            </Container>
        
        ))}
      </ul>

      




      <Row>
          <div className='col-sm-12'>
      <div style={{backgroundColor:'whitesmoke',position:'absolute', top:'0',right:'0',height:"100vh",width:"60vh"}}>
            <Container>
              <Row >
                  <div className='col-sm-12' style={{paddingTop:'30%'}}>
                  <Button style={{backgroundColor:'green',width:'-webkit-fill-available',borderRadius: '0 !important'}}>Place Order</Button>
                  </div>
                  <div className='col-sm-12' style={{paddingTop:'4%'}}>
                    <div style={{fontWeight:'200',fontSize:'14px'}}>If you’re not around when the delivery person arrives, they’ll leave your order at the door. By placing your order, you agree to take full responsibility for it once it’s delivered.</div>
                  </div>
              </Row>
              <Row>
              <Row style={{paddingTop:'2%',paddingBottom:'3%'}}>
                <hr  className="one"></hr>
            </Row>
              </Row>
              <Row>
                  <div className='col-sm-6'>
                    <div style={{fontWeight:'200px',fontSize:'16px',paddingLeft:'10%'}}>Subtotal</div>
                  </div>
                  <div className='col-sm-6 text-center'>
                    <div style={{fontWeight:'200px',right:'0',fontSize:'16px',paddingLeft:'10%'}}>${totalBill}</div>
                  </div>
              </Row>
              <Row style={{paddingTop:'3%'}}>
                  <div className='col-sm-6'>
                    <div style={{fontWeight:'200px',fontSize:'16px',paddingLeft:'10%'}}>Taxes & Fees</div>
                  </div>
                  <div className='col-sm-6 text-center'>
                    <div style={{fontWeight:'200px',right:'0',fontSize:'16px',paddingLeft:'10%'}}>${tax}</div>
                  </div>
              </Row>
              <Row style={{paddingTop:'3%'}}>
                  <div className='col-sm-6'>
                    <div style={{fontWeight:'200px',fontSize:'16px',paddingLeft:'10%'}}>Delivery Fee</div>
                  </div>
                  <div className='col-sm-6 text-center'>
                    <div style={{fontWeight:'200px',right:'0',fontSize:'16px',paddingLeft:'10%'}}>${delivery_fee}</div>
                  </div>
              </Row>

              
              <Row style={{paddingTop:'3%'}}>
                  <div className='col-sm-6'>
                    <div style={{fontWeight:'200px',fontSize:'16px',paddingLeft:'10%'}}>CA Driver Benefits</div>
                  </div>
                  <div className='col-sm-6 text-center'>
                    <div style={{fontWeight:'200px',right:'0',fontSize:'16px',paddingLeft:'10%'}}>${ca}</div>
                  </div>
              </Row>
            
              <Row style={{paddingTop:'2%',paddingBottom:'0%'}}>
                <hr  className="one"></hr>
            </Row>
                       
            <Row style={{paddingTop:'1%'}}>
                  <div className='col-sm-6'>
                    <div style={{fontWeight:'bold',fontSize:'16px',paddingLeft:'10%'}}>Add a Tip</div>
                  </div>
                  <div className='col-sm-6 text-center'>
                    <div style={{fontWeight:'200px',right:'0',fontSize:'16px',paddingLeft:'10%'}}>${delivery_fee}</div>
                  </div>
              </Row>

              <Row>
            <div className='col-sm-12' style={{paddingTop:'1%'}}>
                    <div style={{fontWeight:'200',fontSize:'14px'}}>Delivery people are critical to our communities at this time. Add a tip to say thanks.</div>
                  </div>
              </Row>

              


            <Row style={{paddingTop:'2%',paddingBottom:'3%'}}>
                <hr  className="one"></hr>
            </Row>  

            <Row style={{paddingTop:'1%'}}>
                  <div className='col-sm-6'>
                    <div style={{fontWeight:'bold',fontSize:'20px',paddingLeft:'10%'}}>Total</div>
                  </div>
                  <div className='col-sm-6 text-center'>
                    <div style={{fontWeight:'200px',right:'0',fontSize:'20px',paddingLeft:'10%'}}><b>${totalAfterTax}</b></div>
                  </div>
              </Row>

            </Container>
        </div>
        </div>

      </Row> 
    </Container>
       

    );
}
export default Checkout;