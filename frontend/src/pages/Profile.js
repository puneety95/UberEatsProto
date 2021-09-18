import {ListGroup,Button,Modal,Form,Col,Row} from 'react-bootstrap';
import blankuser from  '/home/puneet/CourseWork/uber_eats/frontend/src/blankuser.jpeg';
import './Profile.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
function Profile()
{
    const [show, setShow] = useState(false);
    const[page,setPage]=useState(true);

    useEffect(()=>{
        axios.get("http://localhost:4000/profile").then((response)=>{
          console.log(response.data);
        });
   
    },[]);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    let uname="Puneet Yadav";
    let emailid="punyad2@gmail.com";
    let phonenumber="9911294356";
    let dob="09/25/1995";
    let country="United States  of America";
    let state="California";
    let Nickname="Puneet";
    
    return(
        <div>
    <div style={{display:'flex',justifyContent:'center',marginRight:'5%',marginTop:'5%'}}>
          <img src={blankuser} width='80px' height='80px' id="profileimagedrawer" style={{borderRadius:'50%'}} alt="user" ></img>
          </div>
    <div id="profile_details">
      
        <div>
        <ListGroup>
                <ListGroup.Item>Name</ListGroup.Item>
                <ListGroup.Item>Email ID</ListGroup.Item>
                <ListGroup.Item>Phone Number</ListGroup.Item>
                <ListGroup.Item>Date of Birth</ListGroup.Item>
                <ListGroup.Item>State</ListGroup.Item>
                <ListGroup.Item>Country</ListGroup.Item>
                <ListGroup.Item>Nick Name</ListGroup.Item>

            </ListGroup>
        </div>
        <div>
        <ListGroup>
                <ListGroup.Item>{uname}</ListGroup.Item>
                <ListGroup.Item>{emailid}</ListGroup.Item>
                <ListGroup.Item>{phonenumber}</ListGroup.Item>
                <ListGroup.Item>{dob}</ListGroup.Item>
                <ListGroup.Item>{state}</ListGroup.Item>
                <ListGroup.Item>{country}</ListGroup.Item>
                <ListGroup.Item>{Nickname}</ListGroup.Item>

            </ListGroup>
        </div>
        </div>
        <div>
        <Button onClick={handleShow} style={{marginLeft:"44%",marginTop:"1%"}} id="updateprofile">Update Details</Button>
        </div>
        

            
    </div>);
}
export default Profile;