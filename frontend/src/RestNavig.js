import { Container,Row,Col, Navbar,Button, NavItem,Nav } from "react-bootstrap";
import brandlogo from "./logo2.svg";
import "./RestNavig.css";
import {Link}
 from 'react-router-dom';
//  import brandlogo from "./brand.svg";

function RestNavig() {
  return (
    <Container fluid style={{padding:'0'}}>
        <Navbar style={{paddingRight:"0"}} bg="dark">
          <Container fluid>
            <Row style={{flex:1}}>
             
              <div className="col-sm-2">
              <Navbar.Brand>
                   <img
                     width="146px"
                     height="24px"
                     className="img-responsive"
                     src={brandlogo}
                     alt="logo"
                   />
                   
              </Navbar.Brand>
              </div>
              <div id="cforresttxt" className="col-sm-2">
              <div id="forresttxt">Restaurant Manager</div>
              </div>
            
              <div  className="col-sm-1" >  
                 <NavItem id="rest_nav_button">
                  <Link to="/dashboard"> <Button id="rest_navig_1">Home</Button></Link>
                 </NavItem>
               </div>

               <div id="rest_nav_button" className="col-sm-1">
                 <NavItem id="rest_nav_button">
                  <Link to="/orders"> <Button id="rest_navig_1">Orders</Button> </Link>
                 </NavItem>
               </div>
               
               <div id="rest_nav_button" className="col-sm text-center">
               <NavItem id="rest_nav_button">
                   <Button >Log Out</Button>
                   </NavItem>
               </div>
            
            </Row>

          </Container>

      </Navbar>
     

    </Container>
  );
  
}
export default RestNavig;
