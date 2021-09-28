import {Container,Row,Form ,ListGroup,Table,Modal,Dropdown,Button} from 'react-bootstrap';
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


    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
  
    const imageChangeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    };
  
       
    function UploadImageHandler()
    {
     alert("inside");
     
    let formData = new FormData();
    console.log(selectedFile);
    formData.append('File',selectedFile);
    console.log(formData);
      axios({
        method:"post",
        url:"http://localhost:4000/uploadImage",
        headers:{ "Content-Type": "multipart/form-data","Authorization": bearer},
        data: formData
      })
      .then((response)=>{
        alert("File Uploaded");
      })
      

    }

    const handleUpdateChange=(e)=>
    {
      // let hours = document.getElementById('appt_from').value
      // let   h=hours[0]+hours[1];
      //  console.log(h);
      //   let suffix = h >= 12 ? "PM":"AM";
      //   h = (h%12);
      //   if(h===0)
      //   {
      //     h=(suffix==="PM")?12:0
      //   }
        
      //   h = h +":"+hours[3]+hours[4]+ suffix;
      //   hours = document.getElementById('appt_to').value
      //   console.log(hours);
      //   let  h2=hours[0]+hours[1];  
        
      //   suffix = h2 >= 12 ? "PM":"AM";
      //   h2= (h2%12);
      //  if(h2===0)
      //  {
      //   h2=(suffix==="PM")?12:0
      //  }
      //   h2 = h2 +":"+hours[3]+hours[4]+ suffix;
      //   console.log(h2);
        
      //   let time =h +"-" + h2 +" "+ document.getElementById('from_day').value +"-" +document.getElementById('to_day').value; 


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
   
    
    let dish_image2="./food1.jpg";
    return (
        <Container>
            <Row>
                <div className="col-sm">
                <div className="image_over_Text2">
                 <img style={{width:'100%',height:'240px',objectFit:'cover'}}  src={require("../Images/food22.jpg").default} alt="cover_image" /> 
                
                  <input name ="uploadImage" onChange={(event)=>{imageChangeHandler(event)}} type="file" name="my file"/>
                     <Button onClick={UploadImageHandler} style={{position:"absolute",borderColor:"green",backgroundColor:"dimgrey",top:"18%",left:"76%"}}>Change Cover</Button>
                           
                 
                 </div></div>
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