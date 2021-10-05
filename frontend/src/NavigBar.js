import brandlogo from "./brand.svg";
import { Button, Navbar, ButtonGroup, Nav, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as CGIcons from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.css";
import {useState} from "react";
import "./NavigBar.css";
import SideDrawer from "./SideDrawer";
import BackDrop from "./BackDrop";
import {useHistory} from "react-router-dom";

function NavigBar(props) {
  const history=useHistory();
  const [sideDrawerView,setSideDrawerView] =useState(false);
  
  

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
                id="b1"
                name="toggle"
                className="rounded-pill"
              >
                Delivery
              </Button>
              <Button
                type="radio"
                id="b2"
                name="toggle"
                className="rounded-pill"
              >
                Pickup
              </Button>
            </ButtonGroup>
          </div>
        </Nav>
        <Nav id="space">
          <Button id="navaddress" className="rounded-pill">
            <MdIcons.MdLocationOn />
            754 The Alameda. Now
          </Button>
        </Nav>
        <Nav className="flex-container">
          <div id="navsearch">
            <FaIcons.FaSearch id="icon" />
            <Form>
              <Form.Control
                id="navform"
                type="text"
                placeholder="What are you craving?"
              />
            </Form>
          </div>
          </Nav>
          <Nav className="ms-auto" >
              <Button id="cart_button" className="rounded-pill">
                 <CGIcons.CgShoppingCart/>Cart
              </Button>
          </Nav>
      </Navbar>
    </div>
  );
}
export default NavigBar;
