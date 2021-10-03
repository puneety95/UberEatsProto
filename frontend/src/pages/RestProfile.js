import {Container,Row,Form,Modal,Col,Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';
function RestProfile()
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    
    const [profDetails,setProfDetails] =useState([]);
    const [dumProfDetails,setDumProfDetails] =useState([]);

    const handleUpdateChange=(e)=>
    {
        const {name ,value}=e.target;        
        setDumProfDetails(prevState=>({
          ...prevState,
          [name] :value
        }));
       
    }
    
  const handleSubmit = (e) => {
    
   console.log(JSON.stringify(dumProfDetails));

   
      
        axios({
          method:"post",
          url:"http://localhost:4000/RestProfileUpdate",
          headers:{"Content-Type":"application/json","Authorization": bearer},
          data: dumProfDetails
        })
        .then((response)=>{
          alert("Data Updated");
          setProfDetails(dumProfDetails);
          handleClose();
        })
        .catch((error)=>{
          alert("There were some error while updating the data");
        });
      
    }


    useEffect(()=>{
      axios({
        method: "get",
        url: "http://localhost:4000/RestProfile",
        headers: { "Content-Type": "application/json","Authorization": bearer  },
        
      })
        .then((response) => {
         setProfDetails(response.data.profileDetails[0]);
         setDumProfDetails(response.data.profileDetails[0]);
        })
        .catch((error) => {
          console.log((error.response.data));
        });
    },[])
   

    const imageHandler=async (e)=>{
      e.preventDefault();
    const imageInput = document.querySelector("#imageInput");
    
    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log("before file");
    console.log(formData);
    let url;
        
    await  axios({
        method: "get",
        url: "http://localhost:4000/s3Url",
        headers: { "Content-Type": "application/json","Authorization": bearer  },
        
      })
        .then((response) => {
          
          url=response.data.url;
          console.log("Url after ->",url);
          
        })
        .catch((error) => {
          console.log((error.response.data));
        });

      axios({
        method:"put",
        url:url,
        headers: {"Content-Type": "multipart/form-data"},
        body: file
      
         }).then((response)=>{
           console.log(response);

         }) 
         .catch((error) => {
          console.log(error);
        }); 
        
        const imageUrl = url.split('?')[0]
        console.log("URL of the uploaded image",imageUrl);

    }
    
    let dish_image2="./food1.jpg";
    return (
        <Container>
            <Row>
                <div className="col-sm">
                <div className="image_over_Text2">
                 <img style={{width:'100%',height:'240px',objectFit:'cover'}}  src={require("../Images/food22.jpg").default} alt="cover_image" /> 
                
                 <form id="imageForm">
                 <input id="imageInput"  type="file" accept="image/*"/> 
                     <Button onClick={(e)=>{imageHandler(e)}} style={{position:"absolute",borderColor:"green",backgroundColor:"dimgrey",top:"18%",left:"76%"}}>Change Cover</Button>
                     </form>
                     </div>
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
              <div className="col-sm text-center">
                <Button onClick={handleShow}>Update</Button>
              </div>
            </Row>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Edit Dish</Modal.Title>
        </Modal.Header>
        <Container fluid>
        <Modal.Body>
            
        <Form style={{marginTop:'6%'}} id="customer_signup">
            <Row>
                <div className="col-sm-3 text-center">
                <label for="name">Name</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{handleUpdateChange(e)}} style={{marginBottom:"8%"}} type="text" name="name" value={dumProfDetails.name} />
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="location">Location</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{handleUpdateChange(e)}} style={{marginBottom:"8%"}} type="text" name="location" value={dumProfDetails.location}  />
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="r_contact">Contact</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{handleUpdateChange(e)}} style={{marginBottom:"8%"}} type="text" name="r_contact"  value={dumProfDetails.r_contact} />
                </div>
        
         </Row>
         
         <Row>
                <div className="col-sm-3 text-center">
                <label for="Timings">Timings</label>
                </div>
                <div className="col-sm-3">
                  <span> From:</span>
                  <select id="from_day" className="custom-select" >
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
                <div className="col-sm-2">
                <span> To:</span>
                <select id="to_day" name className="custom-select" >
                <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>

                
         </Row>
         <Row>
         <div className="col-sm-3">
                  
          </div>
          <div className="col-sm-3">
          <input type="time" id="appt_from" name="appt"/> 
          </div>
          <div className="col-sm-3">
          <input type="time" id="appt_to" name="appt"/> 
          </div>
         </Row>
      
        
         
         <Row style={{paddingTop:"2%"}}>
                <div className="col-sm-3 text-center">
                <label for="r_description">Description</label>
                </div>
                <div className="col-sm-9">
                <textarea onChange={(e)=>{handleUpdateChange(e)}}  class="form-control " name="r_description" value={dumProfDetails.r_description}  rows="5"></textarea>
                </div>
                
         </Row>
                           
     </Form>
     </Modal.Body>
            </Container>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" style={{backgroundColor:"green"}}  value="button" id="dish_form_modal" onClick={handleSubmit} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
    );
}
export default RestProfile;