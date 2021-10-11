//import {Navbar,Nav} from 'react-bootstrap';
import './SideDrawer.css';
import {Row,Col, Container } from 'react-bootstrap';
import blankuser from  './Images/blankuser.jpeg';
import {Link,useHistory} from 'react-router-dom';
import  * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import {ListGroup} from 'react-bootstrap';
import * as RiIcons from 'react-icons/ri';
import "./SideDrawer.css"
import { useEffect,useState } from 'react';
import axios from 'axios';
import { server_url } from './values';
function alert_message()
{
    alert("Puneet");
}
function SideDrawer(props)  
{
    const history=useHistory();
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [profilePic,setProfilePic] = useState();
    const [profileNane,setProfileName] = useState();
    let id=localStorage.getItem('id');
    let uname="Puneet";
    const logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        history.push('/login');
      }

      useEffect(()=>{
        axios({
          method: "get",
          url:server_url +`/getCustImage?id=${id}`,
          headers: { "Content-Type": "application/json","Authorization": bearer  },
          
        })
          .then((response) => {
            console.log("PUneettttttttttt--",response.data[0].profile_pic);
            setProfilePic(response.data[0].profile_pic);
            setProfileName(response.data[0].name);
            
          })
          .catch((error) => {
            alert("There were some error whilefetching customer details");
            console.log((error.response));
          });
      },[])

    return(
    <Container fluid>
       
        <div className='sidedrawer'>
            
                <div className="drawercont">
                    <div class='flex_cont'>
                    <img src={(profilePic) ? profilePic :blankuser} width='46px' height='46px' style={{objectFit:'cover'}}  id="userimagedrawer" alt="user"></img>
               <div style={{marginLeft:'3%'}}>
               
               <Row>
                        <Col xs='2'>{profileNane}</Col>
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
                    <ListGroup.Item><Link to='/custorder' style={{color:"black",textDecoration:"none"}}><RiIcons.RiBillFill/>Orders</Link></ListGroup.Item>
                         <ListGroup.Item  ><Link to='/Favorites' style={{color:"black",textDecoration:"none"}}><MdIcons.MdFavorite/>Favorites</Link></ListGroup.Item>
                         <ListGroup.Item onClick={(e)=>{logout(e)}} style={{color:"black",cursor:"pointer",textDecoration:"none"}}><FiIcons.FiLogOut/>Log Out</ListGroup.Item>
                         
  
                    </ListGroup>

                </div>




                    </div>
                    
        </div>
        </Container>
    );      
}
export default SideDrawer;