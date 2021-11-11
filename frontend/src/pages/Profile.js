import {
  ListGroup,
  Button,
  Modal,
  Form,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import validator from 'validator';
import blankuser from "../Images/blankuser.jpeg";
import {Link} from 'react-router-dom';
import "./Profile.css";
import { useState, useEffect ,useMemo} from "react";
import axios from "axios";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {useDispatch} from 'react-redux';
import { server_url } from '../values';

function Profile() {
  const dispatch=useDispatch();
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [profileupdate,setprofileupdate] =useState(false);
  
  const [custDetails, setCustDetails] = useState({});
  const [dumCustDetails, setDumCustDetails] = useState([]);
  const [country,setCountry]=useState();
    const [region,setRegion]=useState();
    const [city,setCity]=useState();
  const updateImage = () => setShowImage(true);

  

  const updateImageClose = () =>{
    setShowImage(false); 
    
  } 
  const handleClose = () =>{ 
    setDumCustDetails(custDetails);
    setShow(false);
    
  }
  const handleShow = () =>{
    setDumCustDetails(custDetails);
    setShow(true);
  }
  let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
  let id=localStorage.getItem('id');
  
  
  
  
  useEffect(()=>{
    axios({
      method: "get",
      url:server_url+`/getCustProfile?id=${id}`,
      headers: { "Content-Type": "application/json","Authorization": bearer  },
      
    })
      .then((response) => {
        console.log("PUneettttttttttt--",response.data);
        setCustDetails(response.data);
        setDumCustDetails(response.data);
       
      })
      .catch((error) => {
        alert("There were some error whilefetching customer details");
        console.log((error.response));
      });
  },[profileupdate])
 

 

 const handleUpdateChange=(e)=>  
 {
     const {name ,value}=e.target;        
     setDumCustDetails(prevState=>({
       ...prevState,
       [name] :value
     }));
    }

//Upate changes
const handleSubmit = (e) => {

  if (!(validator.isEmail(dumCustDetails.email))) {
          
     alert('Enter valid Email!');
           
    return ;
  }

  if(!(validator.isMobilePhone(dumCustDetails.phone))) 
  {
    if((dumCustDetails.phone.length !== 10))
    {

      alert('Enter valid Phone number!');
    }
  
    
    return ;
  }

  let ele = document.getElementById("customer_details");
  let chk_status = ele.checkValidity();
  ele.reportValidity();
 
  if (!chk_status) {
    return;
  }
    e.preventDefault();
       axios({
         method:"post",
         url:server_url+"/CustProfileUpdate",
         headers:{"Content-Type":"application/json","Authorization": bearer},
         data: dumCustDetails
       })
       .then((response)=>{
         alert("Data Updated");
         localStorage.setItem('location',dumCustDetails.city)
         setCustDetails(dumCustDetails);
         setDumCustDetails(custDetails);
         handleClose();
       })
       .catch((error)=>{
         if(error.response.status==403)
         {
           alert("Email id already exists !!!! , could not update data")
         }
         else
         {
          alert("There were some error while updating the data");
         }  
       });

    handleClose() ;
     
   } 


  //To Upload data and get the url
  const imageHandler = async (e) => {
    e.preventDefault();
    const imageInput = document.querySelector("#imageInput");
    const file = imageInput.files[0];
    if(!file)
    {
      alert("Please select image to upload");
      return;
    }
    const { url } = await fetch(server_url+"/s3Url").then((res) =>
      res.json()
    );
    
    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];
    console.log("Puneee",imageUrl);
    let id = localStorage.getItem("id");
    let data = { imageUrl, id };
    await axios({
      method: "POST",
      url:server_url +"/updateCustomerProfilePic",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      data: data,
    })
      .then((res) => {
        alert("Image Uploaded");
        setprofileupdate(!(profileupdate));
      })
      .catch((error) => {
        alert("There were some errrs while updating image photo");
      });
      updateImageClose();
     };

  return (
    <div>
      <div
        style={{
          display: "flex",
          postion: "relative",
          justifyContent: "center",
          marginRight: "5%",
          marginTop: "5%",
        }}
      >
        <Container>
          <Row>
            <div
              className="col-sm-6"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <img
                onClick={updateImage}
                src={custDetails.profile_pic?custDetails.profile_pic:blankuser}
                width="80px"
                height="80px"
                id="profileimagedrawer"
                style={{ borderRadius: "50%", cursor: "pointer" ,objectFit:'cover'}}
                alt="user"
              ></img>
            </div>
            <div className="col-sm-6">
              <div>{custDetails.name}</div>
            <Link to='/Favorites'>  <Button
                className="shadow-none"
                style={{ color: "green", background: "white", border: "none" }}
                id="profile_image_space"
              >
                <u>Favourties</u>
              </Button>
              </Link>
            </div>
          </Row>
        </Container>
      </div>

      <div id="profile_details">
        <Container>
          <Row>
            <div
              style={{ display: "flex", justifyContent: "flex-end" }}
              className="col-sm-6"
            >
              <ListGroup>
                <ListGroup.Item>Email ID</ListGroup.Item>
                <ListGroup.Item>Phone Number</ListGroup.Item>
                <ListGroup.Item>Date of Birth</ListGroup.Item>
                <ListGroup.Item>City</ListGroup.Item>
                <ListGroup.Item>State</ListGroup.Item>
                <ListGroup.Item>Country</ListGroup.Item>
                <ListGroup.Item>Nick Name</ListGroup.Item>
                <ListGroup.Item>About</ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col-sm-6">
              <ListGroup style={{ fontWeight: "300" }}>
                <ListGroup.Item>{custDetails.email}</ListGroup.Item>
                <ListGroup.Item>{custDetails.phone}</ListGroup.Item>
                <ListGroup.Item>{custDetails.dob}</ListGroup.Item>
                <ListGroup.Item>{custDetails.city}</ListGroup.Item>
                <ListGroup.Item>{custDetails.state}</ListGroup.Item>
                <ListGroup.Item>{custDetails.country}</ListGroup.Item>
                <ListGroup.Item>{custDetails.nickname}</ListGroup.Item>
                <ListGroup.Item><textarea  style={{ fontWeight: "300" }} readonly value={custDetails.about}></textarea></ListGroup.Item>
              </ListGroup>
            </div>
          </Row>
        </Container>
      </div>
      <div>
        <Button
          className="shadow-none"
          onClick={handleShow}
          style={{ marginLeft: "44%", marginTop: "1%" }}
          id="updateprofile"
        >
          Update Details
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header> 
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Container fluid>
          <Modal.Body>
            <Form style={{ marginTop: "6%" }} id="customer_details">
              <Row>
                <div className="col-sm-3 text-center">
                  <label for="name">Name</label>
                </div>
                <div className="col-sm-9">
                  <input
                    style={{ marginBottom: "8%" }}
                    type="text"
                    name="name"
                    value={dumCustDetails.name}
                    required
                    onChange={(e)=>{handleUpdateChange(e)}}
                  />
                </div>
              </Row>

              <Row>
                <div className="col-sm-3 text-center">
                  <label for="email">Email</label>
                </div>
                <div className="col-sm-9">
                  <input
                    style={{ marginBottom: "8%" }}
                    type="text"
                    name="email"
                    value={dumCustDetails.email}
                    required
                    onChange={(e)=>{handleUpdateChange(e)}}
                  />
                </div>
              </Row>



              <Row>
                <div className="col-sm-3 text-center">
                  <label for="phone">Phone Number</label>
                </div>
                <div className="col-sm-9">
                  <input
                    style={{ marginBottom: "8%" }}
                    type="tel"
                    patern="[0-9]{3} [0-9]{3} [0-9]{4}"
                    name="phone"
                    value={dumCustDetails.phone}
                    oninvalid="this.setCustomValidity('Enter User Name Here')"
                    oninput="this.setCustomValidity('')"
                    required
                    onChange={(e)=>{handleUpdateChange(e)}}

                  />
                </div>
              </Row>
              <Row>
                <div className="col-sm-3 text-center">
                  <label for="dob">Date of Birth</label>
                </div>
                <div className="col-sm-9">
                  <input
                    style={{ marginBottom: "8%" }}
                    type="date"
                    placeholder="dd-mm-yyyy"
                    name="dob"
                    value={dumCustDetails.dob}
                    required
                    onChange={(e)=>{handleUpdateChange(e)}}
                  />
                </div>
              </Row>

              <Row>
                <div className="col-sm-3 text-center">
                  <label for="nickname">Nickname</label>
                </div>
                <div className="col-sm-9">
                  <input
                    style={{ marginBottom: "8%" }}
                    type="text"
                    name="nickname"
                    value={dumCustDetails.nickname}
                    required
                    onChange={(e)=>{handleUpdateChange(e)}}
                  />
                </div>
              </Row>

              <Row>
                <div className="col-sm-3 text-center">
                  <label for="country">Country</label>
                </div>
                <div className="col-sm-6">
                    <CountryDropdown  style={{paddingBottom:'2%',width:'-webkit-fill-available'}}
                      value={(dumCustDetails.country) ? dumCustDetails.country:country}
                    
                      name="country"
                      onChange={
                        (val,e) => 
                        {
                          setCountry(val);
                          handleUpdateChange(e);
                        }} />                                                 
                </div>
              </Row>

              <Row style={{paddingTop:'2%'}}>
                <div className="col-sm-3 text-center">
                  <label for="state">State</label>
                </div>
                <div className="col-sm-6">
                <RegionDropdown  name="state" style={{paddingBottom:'2%',marginTop:'2%',width:'-webkit-fill-available'}}
                   country={(dumCustDetails.country) ? dumCustDetails.country:country}
                   value={(dumCustDetails.state) ? dumCustDetails.state:region}
                  onChange={(val,e) => {setRegion(val)
                    if(val=='-')
                    {
                     setRegion(dumCustDetails.state)
                     }
                     handleUpdateChange(e);
                    }
          } />
               
                  
                </div>
              </Row>

              <Row style={{paddingTop:'2%'}}>
                <div className="col-sm-3 text-center">
                  <label for="city">City</label>
                </div>
                <div className="col-sm-9">
                  <input
                    style={{ marginBottom: "8%" }}
                    type="text"
                    name="city"
                    value={dumCustDetails.city}
                    required
                    onChange={(e)=>{handleUpdateChange(e)}}
                  />
                </div>
              </Row>

              <Row>
                <div className="col-sm-3 text-center">
                  <label for="about">About Me</label>
                </div>
                <div className="col-sm-9">
                  <textarea
                    style={{ marginBottom: "8%" }}
                    type="textarea"
                    name="about"
                    value={dumCustDetails.about}
                    required
                    onChange={(e)=>{handleUpdateChange(e)}}
                  />
                </div>
              </Row>



             

            </Form>
          </Modal.Body>
        </Container>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
          onClick={(e)=>{handleSubmit(e)}}
            variant="primary"
            style={{ backgroundColor: "green" }}
            value="button"
            id="dish_form_modal"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showImage} onHide={updateImageClose}>
        <Modal.Header>
          <Modal.Title>Edit Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>Please upload file to change the profile image.</Col>
            </Row>
            <Row style={{ marginTop: "2%" }}>
              <div className="col-sm-6">
                <input id="imageInput" type="file"></input>
              </div>
              <div className="col-sm-6">
                <Button onClick={(e)=>{imageHandler(e)}}> Update</Button>
              </div>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Profile;
