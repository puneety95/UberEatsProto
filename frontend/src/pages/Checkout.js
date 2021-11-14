import {Container,Navbar,Button,Modal,Row,Nav,InputGroup} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import brandlogo from "../brand.svg";
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';
import SideDrawer from "../SideDrawer";
import BackDrop from "../BackDrop";
import {useCart} from "react-use-cart";
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';
import * as BiIcons from 'react-icons/bi';
import {useSelector} from 'react-redux';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {bindActionCreators} from "redux";
import {cartRefresh} from "../state/action-creators/actions";
import {useDispatch} from 'react-redux';
import { server_url } from '../values';



function Checkout()
{
    const history=useHistory();
    const [sideDrawerView,setSideDrawerView] =useState(false);
    const [qty,ChangeQty]  =useState(true);
    const [totalBill,setTotalBill] = useState();
    const [totalAfterTax,setTotalAfterTax] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [country,setCountry]=useState();
    const [region,setRegion]=useState();
    const [city,setCity]=useState();
    const [street,setStreet]=useState();
    const [savedAdd,setSavedAdd] = useState([{address:""}]);
    const [addressChecked,setAddressChecked]=useState();
    const [instruct,setInstruct]=useState();
    const [special,setSpecial]=useState();
    const [special2,setSpecial2]=useState();
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    let id=localStorage.getItem('id'); 
    const state2=useSelector((state)=>state.delivery);
    const dispatch=useDispatch();
    const handleClose = () => {
      setShow(false);
      setCountry();
    }
   
    const saveInstruction=()=>{
      
      setInstruct(false);
      setSpecial2(special);
      
    }
    
    const handleShow = () => setShow(true);
    
    //Function to send order data to server
    const placeOrder=()=>{
      
    if(!addressChecked)
    {
      alert("Please select one address");
    }
    let rest_id=items[0].r_id;
    let del_add=addressChecked;
    let cust_id=id;
    let time=new Date();
    let mode=state2.toggle;
    let special_instruction=special2;
    let data={rest_id,del_add,cust_id,time,mode,special_instruction};
   
     let i=1;
   
    axios({
      method: "post",
      url: server_url + `/createOrder`,
      headers: { "Content-Type": "application/json","Authorization": bearer  },
      data:{
        order:data,
        items:items
      }
      
    }).then ((response)=>{
      alert("Orde Placed successfully");
     // emptyCart();
  
      goToHome();
      emptyCart();

    })
    .catch((error)=>{
      console.log("There were some problems were creating the order.")
    })

    }

    
   const save_address=()=>{
   
     if(!city|| !street )
     {
      
       alert("Please fill all the fields");
       return;
     }
     let address=street +','+city+','+region +','+country;
    
     let data={id,address};

     axios({
      method: "post",
      url: server_url+`/addDeliveryAddress`,
      headers: { "Content-Type": "application/json","Authorization": bearer  },
      data:data
      
    })
      .then((response) => {
        alert("Address Updated Successfully");
        setSavedAdd([{address},...savedAdd])
        console.log("After sacvingnew address",savedAdd);
        setCountry();
        setRegion();
        setStreet();
        setCity();
        handleClose();
       
      })
      .catch((error) => {
        alert("There were some errors while saving new address");
        console.log((error.response));
      });

      handleShow();
   }
 
    const { items , emptyCart } = useCart();
    
    let tax=3;
    let delivery_fee=2;
    let ca=1;

    const changeQty=(item_id,value)=>{
      for(let i in items)
      {
          if(items[i].id==item_id)
          {
            items[i].size=value;
            setTotalBill(total);
            ChangeQty(!qty);
  
          }  
      }
  
    }

    let total=0;
    for(let i in items)
    {
         total=total+items[i].price * items[i].size;
    }

    useEffect(()=>{
      setTotalBill(total);
      let t=total;
      setTotalAfterTax(t);


      axios({
        method: "get",
        url: server_url+`/getDeliveryAddress?id=${id}`,
        headers: { "Content-Type": "application/json","Authorization": bearer  },
          
      })
        .then((response) => {
          //console.log(response.data);
          setSavedAdd(response.data) ;
          console.log("SAved Addresss-->",savedAdd)                 
        })
        .catch((error) => {
          alert("There were some errors while fetching saved addresses");
          console.log((error.response));
        });
  
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


      //TO get data at the time of page load
      



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
        <div style={{fontSize:'36px',fontWeight:'500',paddingLeft:'9%',paddingTop:'3%',fontFamily:'sans-serif'}}><b><BiIcons.BiRestaurant/> {items[0].n}</b>
          </div>  
      </Row>
      

      <Row style={{paddingTop:'0%',paddingBottom:'2%'}}>
                <hr  className="one"></hr>
            </Row>  

      <Row>
        
        <div style={{fontSize:'36px',fontWeight:'500',paddingLeft:'9%',paddingTop:'1%',fontFamily:'sans-serif',color:'green'}}>Your Items
          </div>  
      </Row>     


           

      <ul>
        {items.map((item) => (  
         
             <Container >
             <Row style={{paddingTop:'1%'}}>
           
           
               <div style={{paddingLeft:'4%',lineHeight:'20px',fontSize:'x-large',fontFamily:'sans-serif '}} className='col-sm-3'>
                <b> {item.name}</b>
             
               </div>
               <div style={{paddingLeft:'4%',lineHeight:'20px',fontSize:'small',fontFamily:'sans-serif '}} className='col-sm-3'>
                <b> {item.price} x $ {item.size}</b>
             
               </div>
              
               <div className='col-sm-2 text-right'>
                <FiIcons.FiDollarSign/> {parseFloat(item.price * item.size).toFixed(2)}
               </div>
             </Row>
             <Row style={{paddingTop:'0%',paddingBottom:'3%',width:'800px'}}>
                <hr  className="one"></hr>
            </Row> 
            </Container>
        
        ))}
      </ul>
      
      <Row>
        <div style={{fontSize:'36px',fontWeight:'500',paddingLeft:'9%',paddingTop:'1%',fontFamily:'sans-serif',color:'green'}}>Address
          </div>  
      </Row> 

      <Row>
      <div style={{fontSize:'36px',fontWeight:'500',paddingLeft:'9%',paddingTop:'1%'}}>
          <Button  onClick={handleShow} style={{backgroundColor:'black'}}>Add New Address</Button>
        
          </div>  
      </Row> 

      <Row>
        {
      savedAdd.map((add) => (      
           <div style={{fontSize:'20px',fontWeight:'300',paddingLeft:'9%',paddingTop:'1%'}}>
            <input type="radio" id={add.address} name="address" onChange={(e)=>{setAddressChecked(e.target.value)}} value={add.address}/>
            <label for="html">{add.address}</label><br/>
           </div> 

       )) }
           
      </Row> 
     
      <Row>
          <div className='col-sm-12'>
      <div style={{backgroundColor:'whitesmoke',position:'absolute', top:'0',right:'0',height:"100vh",width:"60vh"}}>
            <Container>
              <Row >
                  <div className='col-sm-12' style={{paddingTop:'30%'}}>
                  <Button onClick={placeOrder} style={{backgroundColor:'green',width:'-webkit-fill-available',border:'none',borderRadius: '0 !important'}}>Place Order</Button>
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
                    <div style={{fontWeight:'200px',right:'0',fontSize:'16px',paddingLeft:'10%'}}>${parseFloat(totalBill).toFixed(2)}</div>
                  </div>
              </Row>
                   
                         
              <Row style={{paddingTop:'2%',paddingBottom:'0%'}}>
                <hr  className="one"></hr>
            </Row>
         
            <Row style={{paddingTop:'1%'}}>
                  <div className='col-sm-6'>
                    <div style={{fontWeight:'bold',fontSize:'20px',paddingLeft:'10%'}}>Total</div>
                  </div>
                  <div className='col-sm-6 text-center'>
                    <div style={{fontWeight:'200px',right:'0',fontSize:'20px',paddingLeft:'10%'}}><b>{parseFloat(totalAfterTax).toFixed(2)}</b></div>
                  </div>
              </Row>
              <Row>
            { !instruct    &&
              <div className='col-sm-12' style={{paddingTop:'3%'}}>
                  <Button onClick={()=>setInstruct(true)} style={{backgroundColor:'green',width:'-webkit-fill-available',border:'none',borderRadius: '0 !important'}}>Add Special Instruction</Button>
                  </div>
               }
              </Row>
            
              <Row>
             { instruct && <div className='col-sm-12' style={{paddingTop:'3%'}}>
                  <textarea onChange={(e)=>{setSpecial(e.target.value)}} placeholder= "Any Special Instructions... Please add here!!!!"  style={{width:'-webkit-fill-available',height:'95px'}}>{special}</textarea>
                  </div>
                 
              }
              </Row>

              <Row>
                {instruct && 
                  <div className='col-sm-12' style={{paddingTop:'3%'}}>
                  <Button onClick={()=>saveInstruction()} style={{backgroundColor:'black',width:'-webkit-fill-available',border:'none',borderRadius: '0 !important'}}>Save</Button>
                  </div>
                    

                }
              </Row>
              
            </Container>
        </div>
        </div>

      </Row> 
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row>
         <CountryDropdown style={{paddingBottom:'2%'}}
          value={country}
          onChange={(val) => setCountry(val)} />
          </Row>
          <Row>
            
        <RegionDropdown  style={{paddingBottom:'2%',marginTop:'2%'}}
          country={country}
          value={region}
          onChange={(val) => {setRegion(val)
            if(val=='-')
            {
              setRegion()
            }}
          } />
          </Row>
          <Row>
          {region && 
            <input onChange={(e)=>setCity(e.target.value)} style={{paddingBottom:'2%',marginTop:'2%'}} type='text-area' placeholder="City"></input>
          
          }
          </Row>
          <Row>
          {region && 
            <input onChange={(e)=>setStreet(e.target.value)} style={{paddingBottom:'2%',marginTop:'2%'}} type='text-area' placeholder="Street and Apartment number"></input>
          
          }
         
          </Row>
         
      </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={save_address}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
       

    );
}
export default Checkout;