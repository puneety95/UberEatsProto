import {ListGroup,Button,Modal,Form,Col,Row} from 'react-bootstrap';
import blankuser from  '/home/puneet/CourseWork/uber_eats/frontend/src/blankuser.jpeg';
import './Profile.css'
import {useState} from 'react'
function Profile()
{
    const [show, setShow] = useState(false);

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
        

        <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header >
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      Email
    </Form.Label>
    <Col sm="10">
      <Form.Control plaintext readOnly defaultValue="email@example.com" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Name
    </Form.Label>
    <Col sm="10">
      <Form.Control type="Text" placeholder="Name" />
    </Col>
  </Form.Group>
</Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
            
    </div>);
}
export default Profile;