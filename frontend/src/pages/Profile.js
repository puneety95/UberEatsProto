import {ListGroup,Button,Modal,Form,Col,Container,Row} from 'react-bootstrap';
import ImageButton from 'react-image-button';
 import blankuser from '../Images/blankuser.jpeg';
import './Profile.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Countries from '../components/Countries';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
function Profile()
{
    const [show, setShow] = useState(false);
    const[showImage,setShowImage]=useState(false);
    const[custDetails,setCustDetails]=useState([]);
    const[dumCustDetails,setDumCustDetails]=useState([]);

     useEffect(()=>{
        axios.get("http://localhost:4000/profile").then((response)=>{
          console.log(response.data);
        });
   
    },[]);

    const updateImage=()=>setShowImage(true);
    const updateImageClose=()=>setShowImage(false);

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

    <div style={{display:'flex',postion:'relative',justifyContent:'center',marginRight:'5%',marginTop:'5%'}}>
        
        <Container>
        <Row>
             <div className="col-sm-6" style={{display:'flex',justifyContent:'flex-end'}}>
                <img onClick={updateImage} src={blankuser} width='80px' height='80px' id="profileimagedrawer" style={{borderRadius:'50%',cursor:'pointer'}} alt="user" ></img> 
             </div>
             <div className="col-sm-6">        
                <div>Puneet Yadav</div>
                <Button className='shadow-none' style={{color:'green',background:'white',border:'none'}} id="profile_image_space"><u>Favourties</u></Button>
             </div>
        </Row>
        </Container>
                
        
    </div>
   
    <div id="profile_details">
     
      <Container>
       <Row>
           <div style={{display:'flex',justifyContent:'flex-end'}}className="col-sm-6">
        <ListGroup>
               <ListGroup.Item>Email ID</ListGroup.Item>
                <ListGroup.Item>Phone Number</ListGroup.Item>
                <ListGroup.Item>Date of Birth</ListGroup.Item>
                <ListGroup.Item>City</ListGroup.Item>
                <ListGroup.Item>State</ListGroup.Item>
                <ListGroup.Item>Country</ListGroup.Item>
                <ListGroup.Item>Nick Name</ListGroup.Item>

            </ListGroup>
        </div>
        <div className="col-sm-6">
        <ListGroup style={{fontWeight:'300'}}>
                <ListGroup.Item>emailid</ListGroup.Item>
                <ListGroup.Item>phone</ListGroup.Item>
                <ListGroup.Item>do</ListGroup.Item>
                <ListGroup.Item>Sahibabad</ListGroup.Item>
                <ListGroup.Item>state</ListGroup.Item>
                <ListGroup.Item>state</ListGroup.Item>
                <ListGroup.Item>Nickname</ListGroup.Item>

            </ListGroup>
        </div>
        </Row>
       </Container>
    </div>
        <div>
        <Button className="shadow-none" onClick={handleShow} style={{marginLeft:"44%",marginTop:"1%"}} id="updateprofile">Update Details</Button>
        </div>
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Container fluid>
        <Modal.Body>
            
        <Form style={{marginTop:'6%'}} id="customer_signup">
            <Row>
                <div className="col-sm-3 text-center">
                <label for="name">Name</label>
                </div>
                <div className="col-sm-9">
                <input  style={{marginBottom:"8%"}} type="text" name="name" />
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="phoneNumber">Phone Number</label>
                </div>
                <div className="col-sm-9">
                <input  style={{marginBottom:"8%"}} type="text" name="phoneNumber"   />
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="dob">Date of Birth</label>
                </div>
                <div className="col-sm-9">
                <input style={{marginBottom:"8%"}} type="text" name="dob"   />
                </div>
        
         </Row>
         
         
                           
     </Form>
     </Modal.Body>
            </Container>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" style={{backgroundColor:"green"}}  value="button" id="dish_form_modal"  >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
   

    <Modal show={showImage} onHide={updateImageClose}>
    <Modal.Header >
          <Modal.Title>Edit Image</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Container>
            <Row>
            <Col>
            Please upload file to change the profile image.
            </Col>
            
            </Row>
            <Row style={{marginTop:'2%'}}>
                <div className="col-sm-6">
            <input type='file'></input>
            </div>
            </Row>
            
        </Container>

    </Modal.Body>

    </Modal>

   
    </div>);
}
export default Profile;