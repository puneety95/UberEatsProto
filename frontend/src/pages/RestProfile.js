import {Container,Row,Form ,ListGroup,Table,Modal,Dropdown,Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
function RestProfile()
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [profDetails,setProfDetails] =useState([]);
   

    const handleUpdateChange=(e)=>
    {
        const {name ,value}=e.target;
        setProfDetails(prevState=>({
          ...prevState,
          [name] :value
        }));
    }
    
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target[0].value)
    }


    useEffect(()=>{
      axios({
        method: "get",
        url: "http://localhost:4000/RestProfile",
        headers: { "Content-Type": "application/json","Authorization": bearer  },
        
      })
        .then((response) => {
          
        
         setProfDetails(response.data.profileDetails[0]);
        })
        .catch((error) => {
          console.log((error.response.data));
        });
    },[])
   
     console.log(profDetails);
    let dish_image2="./food1.jpg";
    return (
        <Container>
            <Row>
                <div className="col-sm">
                <img style={{objectFit:"cover",height:"280px",width:"100%"}} src={dish_image2} alt="cover iamge" />
                </div>
            </Row>
            <Row style={{paddingTop:'2%',backgroundColor:'whitesmoke'}}>
             <div style={{textAlign:'right'}} className="col-sm-6 ">
                <span style={{fontSize:"larger",fontWeight:"500"}}>Restaurant Name : </span>
                </div>
                <div className="col-sm-6 "> 
                <span>{profDetails.name}</span>
             </div>
             </Row>
             
             

             <Row style={{paddingTop:'2%',backgroundColor:'whitesmoke'}}>
             <div style={{textAlign:'right'}} className="col-sm-6 ">
                <span style={{fontSize:"larger",fontWeight:"500"}}>Location : </span>
                </div>
                <div className="col-sm-6 "> 
                <span>{profDetails.location}</span>
             </div>
             </Row>

             <Row style={{paddingTop:'2%',backgroundColor:'whitesmoke'}}>
             <div style={{textAlign:'right'}} className="col-sm-6 ">
                <span style={{fontSize:"larger",fontWeight:"500"}}>Contact : </span>
                </div>
                <div className="col-sm-6 "> 
                <span>{profDetails.r_contact}</span>
             </div>
             </Row>

             <Row style={{paddingTop:'2%',backgroundColor:'whitesmoke'}}>
             <div style={{textAlign:'right'}} className="col-sm-6 ">
                <span style={{fontSize:"larger",fontWeight:"500"}}>Timings : </span>
                </div>
                <div className="col-sm-6 "> 
                <span>{profDetails.r_timings}</span>
             </div>
             </Row>

             <Row style={{paddingTop:'2%',backgroundColor:'whitesmoke'}}>
             <div style={{textAlign:'right'}} className="col-sm-6 ">
                <span style={{fontSize:"larger",fontWeight:"500"}}>Description : </span>
                </div>
                <div className="col-sm-6 "> 
                <span>{profDetails.r_description}</span>
             </div>
             </Row>

            <Row>
                <Button onClick={handleShow}>Update</Button>
            </Row>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Edit Dish</Modal.Title>
        </Modal.Header>
        <Container fluid>
        <Modal.Body>
            
        <Form onSubmit={handleSubmit} style={{marginTop:'6%'}} id="customer_signup">
            <Row>
                <div className="col-sm-3 text-center">
                <label for="Name">Name</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{handleUpdateChange(e)}} style={{marginBottom:"8%"}} type="text" name="name" value={profDetails.name} required/>
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="Location">Location</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{setProfDetails.location(e.target.value)}} style={{marginBottom:"8%"}} type="text" name="Location"  required/>
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="Contact">Contact</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{setProfDetails.r_contact(e.target.value)}} style={{marginBottom:"8%"}} type="text" name="Contact"  required/>
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="Timings">Timings</label>
                </div>
                <div className="col-sm-2">
                  
                  <span> From:</span>
                  <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:"green",border:"none"}} id="t_from">
                        <span id="t_from" >Day</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item >Sunday</Dropdown.Item>
                         <Dropdown.Item >Monday</Dropdown.Item>
                         <Dropdown.Item >Tuesday</Dropdown.Item>
                         <Dropdown.Item >Wednesday</Dropdown.Item>
                         <Dropdown.Item >Thursday</Dropdown.Item>
                         <Dropdown.Item >Friday</Dropdown.Item>
                         <Dropdown.Item >Saturday</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
                <div className="col-sm-2">
                <span> To:</span>
                  <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:"green",border:"none"}} id="t_from">
                        <span id="t_from" >Day</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item >Sunday</Dropdown.Item>
                         <Dropdown.Item >Monday</Dropdown.Item>
                         <Dropdown.Item >Tuesday</Dropdown.Item>
                         <Dropdown.Item >Wednesday</Dropdown.Item>
                         <Dropdown.Item >Thursday</Dropdown.Item>
                         <Dropdown.Item >Friday</Dropdown.Item>
                         <Dropdown.Item >Saturday</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
         </Row>
      
        
         
         <Row style={{paddingTop:"2%"}}>
                <div className="col-sm-3 text-center">
                <label for="Description">Description</label>
                </div>
                <div className="col-sm-9">
                <textarea onChange={(e)=>{setProfDetails.r_description(e.target.value)}} class="form-control " name="Description" rows="5"></textarea>
                </div>
                
         </Row>
         <Row>
         <Button variant="primary" type="submit" value="button" id="dish_form_modal" >Save Changes</Button>
         </Row>
                
                           
     </Form>
     </Modal.Body>
            </Container>

     
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" value="button" id="dish_form_modal" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
    );
}
export default RestProfile;