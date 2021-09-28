//import {Navbar,Nav} from 'react-bootstrap';
import './SideDrawer.css';
import {Row,Col, Container } from 'react-bootstrap';
import blankuser from  './blankuser.jpeg';
import {Link} from 'react-router-dom';
import  * as MdIcons from 'react-icons/md';
import {ListGroup} from 'react-bootstrap';
import * as RiIcons from 'react-icons/ri';
import BackDrop from './BackDrop';
import "./SideDrawer.css"
function alert_message()
{
    alert("Puneet");
}
function SideDrawer(props)  
{
    let uname="Puneet";

    return(
    <Container fluid>
       
        <div className='sidedrawer'>
            
                <div className="drawercont">
                    <div class='flex_cont'>
                    <img src={blankuser} width='46px' height='46px' id="userimagedrawer" alt="user"></img>
               <div style={{marginLeft:'3%'}}>
               
               <Row>
                        <Col xs='2'>{uname}</Col>
                        </Row>
                        <Row>
                        <Col onCLick={alert_message} cs='2'><Link to='/profile'>
                            <button  
                            style={{background:'white', border:'none',color:'green',padding:'0px'}}>
                                View Account</button>
                                </Link>
                        </Col>
                        </Row>
                        
               </div>
                   
                    
                    </div>

                <div id="Drawermenu">
                   
                    <ListGroup class="drawerlist" onClick={props.bd_click_handler}>
                    <ListGroup.Item><Link to='/Orders' style={{color:"black",textDecoration:"none"}}><RiIcons.RiBillFill/>Orders</Link></ListGroup.Item>
                         <ListGroup.Item  ><Link to='/Favorites' style={{color:"black",textDecoration:"none"}}><MdIcons.MdFavorite/>Favorites</Link></ListGroup.Item>
                         
  
                    </ListGroup>

                </div>




                    </div>
                    
        </div>
        </Container>
    );      
}
export default SideDrawer;