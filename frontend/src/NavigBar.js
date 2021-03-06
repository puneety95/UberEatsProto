import brandlogo from "./brand.svg";
import { Button, Navbar, ButtonGroup,Modal, Nav, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as CGIcons from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.css";  
import {useEffect, useState} from "react";
import "./NavigBar.css";
import SideDrawer from "./SideDrawer";
import BackDrop from "./BackDrop";
import {useHistory} from "react-router-dom";
import Cart from "./components/Cart";
import {bindActionCreators} from "redux";
import {useSelector,useDispatch} from 'react-redux';
import {deliveryDetails} from './state/action-creators/actions';
import {locationdetails} from './state/action-creators/actions';
import { FiAlertTriangle } from "react-icons/fi";
import {logingetUserDetails} from './state/action-creators/actions';
//class='btn btn-primary shadow-none'
function NavigBar(props) {
  const history=useHistory();
  const [sideDrawerView,setSideDrawerView] =useState(false);
  const [searchCriteria,setSearchCriteria] =useState("");
  const[searchCriteriaValue,setSearchCriteriaValue]=useState("");
  const [cartModal,setCartModal]=useState(false);
  const [toggle,setToggle]=useState('Delivery');
  let user=useSelector((state)=>state.user);
  let ll=user.location;
  const [location,setLocation]=useState(ll);
  const [dummyLocation , setDummyLocation] = useState();
  const dispatch=useDispatch();
  
  // let l=localStorage.getItem('location');
  // const [custlocation , setCustLocation] = useState(l);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const store = useStore()
  // const a= store.getState();
  // console.log("------------------store---------------",a);
  
  //  alert(store_location);
  useEffect(()=>{
    
    const deliveryDetails2=bindActionCreators(deliveryDetails,dispatch);
    let data={toggle}       
    deliveryDetails2(data);

    let d= {...user,
      location: location};
     const loginUserDetails=bindActionCreators(logingetUserDetails,dispatch);
     loginUserDetails(d);
    const locationdetail=bindActionCreators(locationdetails,dispatch)
    let data2={location};
    locationdetail(data2);


  },[toggle,location])

  // useEffect(()=>{
  //   setLocation(store_location.location);
  // },[store_location])
  

  const sd_click_handler=()=>{
    setSideDrawerView((prevState)=>{  
      return (!prevState)
    });   
  }
  const closeSideDrawerHandler=()=>{
    setSideDrawerView(false);
  }

  const goToHome=()=>{
    history.push('/home')
  }
 
  const renderCart=()=>{
    setCartModal(! cartModal);
  }

  const search=(e)=>{
    const form = new FormData(e.target);
    const value = form.get("searchCriteria");
    e.preventDefault();
       
    history.push({
      pathname:'/home',
      searchCriteria:value
    })

  }



  const toggleNavBtn=(e)=>{
    e.preventDefault();
    if(e.target.innerText==toggle)
    {
      return;
    }
    
    e.target.style.backgroundColor='white';
    setToggle(!toggle);
   if(e.target.id=='b2')
   {
    let id_grey=document.getElementById('b1');
    id_grey.style.backgroundColor='#EEEEEE';
    id_grey.style.borderColor='#EEEEEE';
    setToggle('Pickup');
   }
   else
   {
    let id_grey=document.getElementById('b2');
    id_grey.style.backgroundColor='#EEEEEE';
    id_grey.style.borderColor='#EEEEEE';
    setToggle('Delivery');
   }



  }

  return (
    <div>
      {sideDrawerView && <SideDrawer/>}
      {sideDrawerView && <BackDrop closeSideDrawer={closeSideDrawerHandler}/>}
      <Navbar >
        
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
        <Nav>
          <div id="groupBtn" className="rounded-pill">
            <ButtonGroup id="gg" data-toggle="Buttons">
              <Button
                type="radio"
                onClick={(e)=>{toggleNavBtn(e)}}
                id="b1"
                name="toggle"
                className="rounded-pill"
              >
                Delivery
              </Button>
              <Button
                type="radio"
                id="b2"
                onClick={(e)=>{toggleNavBtn(e)}}
                name="toggle"
                className="rounded-pill"
              >
                Pickup
              </Button>
            </ButtonGroup>
          </div>
        </Nav>
        <Nav id="space">
          <Button id="navaddress" onClick={handleShow} className="rounded-pill">
            <MdIcons.MdLocationOn />
           {location}
          </Button> 
        </Nav>
        <Nav className="flex-container">
          <div id="navsearch">
            <FaIcons.FaSearch id="icon" style={{cursor:'pointer'}} onClick={(e)=>{search(e)}} />
            <Form onSubmit={(e)=>{search(e)}}>
              <Form.Control className='shadow-none'
                id="navform"
                type="text"
                name="searchCriteria"
                onChange={(e)=>{setSearchCriteriaValue(e.target.value)}}
                style={{display:'flex'}}
                placeholder="What are you craving?"
                
              />
            </Form>
          </div>
          </Nav>
          <Nav className="ms-auto" >
              <Button id="cart_button" onClick={()=>{renderCart()}} className="rounded-pill">
                 <CGIcons.CgShoppingCart/>Cart
              </Button>
          </Nav>
      </Navbar>
      {cartModal && <Cart p={renderCart}/>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Enter Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" onChange={(e)=>{setDummyLocation(e.target.value)}} ></input>
          
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={(e)=>{
            localStorage.setItem('location', dummyLocation);           
            setLocation(dummyLocation);
             handleClose()
             }}>
           Search
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default NavigBar;
