import {Container,Row,Form,Modal,Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { server_url } from '../values';
import company_logo from '../uber_eats_logo.jpg';
function RestProfile()
{
    //For details upload
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    //For image upload
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2= () => setShow2(true);
    const[coverImageUrl,setCoverImageUrl]=useState();
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
          url:server_url+"/RestProfileUpdate",
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
        url: server_url+"/RestProfile",
        headers: { "Content-Type": "application/json","Authorization": bearer  },
        
      })
        .then((response) => {
          //console.log(response.data.profileDetails[0].profile_pic);
         // console.log("----------",response.data.profDetails[0]);
         setProfDetails(response.data.profileDetails[0]);
         setDumProfDetails(response.data.profileDetails[0]);
        setCoverImageUrl(response.data.profileDetails[0].profile_pic);
        })
        .catch((error) => {
          console.log((error.response));
        });
    },[])
   

    const imageHandler=async (e)=>
    {
      e.preventDefault();
      handleShow2();
     }

     const image_upload_handler=async()=>
    {
     const imageInput = document.querySelector("#imageInput");
     const file = imageInput.files[0];
     if(!file)
     {
       alert("Please select an image to upload");
       return;
     }
     const { url } = await fetch(server_url+"/s3Url").then(res => res.json())
    
  // post the image direclty to the s3 bucket
     await fetch(url, {
     method: "PUT",
     headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
    })

    const imageUrl = url.split('?')[0]
    let id =localStorage.getItem('id');
    let data ={imageUrl,id};
    await axios({
    method:"POST",
    url:server_url+"/RestProfileImageUpdate",
    headers:{"Content-Type":"application/json","Authorization": bearer},
    data: data
    }).then((res)=>{
    setCoverImageUrl(data.imageUrl);
    handleClose2();
  })
  .catch((error)=>{
    alert("There were some errrs while updating profile photo");
  })
  
  }

    
    
    return (
        <Container>
            <Row>
                <div className="col-sm">
                <div className="image_over_Text2" style={{position:'relative'}}>
                 <img style={{width:'100%',height:'240px',objectFit:'cover'}}  src={(coverImageUrl)?coverImageUrl:company_logo} alt="cover_image" /> 
                     <Button onClick={(e)=>{imageHandler(e)}} style={{position:"absolute",borderColor:"green",backgroundColor:"dimgrey",top:"0",right:"0"}}>Change Cover</Button>
      
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
                <span style={{fontSize:"larger",fontWeight:"500"}}>Mode of Delivery : </span>
                </div>
                <div className="col-sm-6 "> 
                <span>{profDetails.type}</span>
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

            <Row style={{marginBottom:'4%',marginTop:'2%'}}>
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
                <label for="type">Mode of Delivery</label>
                </div>
                <div className="col-sm-9">
                <select name="type" id="type" value={setDumProfDetails.type} onChange={(e)=>{handleUpdateChange(e)}}>
                  <option value="Delivery">Delivery</option>
                  <option value="Pickup">Pickup</option>
                </select>
                </div>
        
         </Row>
         
         <Row>
                <div className="col-sm-3 text-center">
                <label for="Timings">Timings</label>
                </div>
                <div className="col-sm-3">
                  <span> From:</span>
                  <select id="from_day" name="r_timings" value={setDumProfDetails.type} onChange={(e)=>{handleUpdateChange(e)}} onChangeclassName="custom-select" >
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
          <input onChange type="time" id="appt_from" name="appt"/> 
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


      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header >
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input id="imageInput"  type="file" accept="image/*"/> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={image_upload_handler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



        </Container>
    );
}
export default RestProfile;