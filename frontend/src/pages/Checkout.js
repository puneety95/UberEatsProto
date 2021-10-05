import {Container,Navbar,Button,Row,Nav} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import brandlogo from "../brand.svg";
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import SideDrawer from "../SideDrawer";
import BackDrop from "../BackDrop";
import CheckoutSummary from '../components/CheckoutSummary';


function Checkout()
{
    const history=useHistory();
    const [sideDrawerView,setSideDrawerView] =useState(false);
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
          <div className='col-sm-12'>
      <div style={{backgroundColor:'whitesmoke',top:'0px',right:'0px',height:"10vh",width:"40vh"}}>
            Puneet
        </div>
        </div>

      </Row> 
    </Container>
       

    );
}
export default Checkout;