import { Container,Form,Dropdown,Row,Button,Modal } from "react-bootstrap";
import {useState,useEffect} from 'react';
import * as BiIcons from 'react-icons/bi';
import DishesAddModal from '../components/DishesAddModal';
import axios from 'axios';
import { server_url } from '../values';


function RestDish()
{
    const [show, setShow] = useState(false);
    const [showDishesModal, setShowDishesModal]=useState(false);
    const [dropDown ,setDropDown] =useState(1);
    const [dishDetails,setDishDetails] =useState([{}]);
    const [dummyDishDetails,setDummyDishDetails] =useState({});

    const [modalDishID ,setModalDishId] =useState(false);
 
    const handleShow = (props) => {
    
     console.log("YES");
     setShow(true);
     console.log("VALUESSE-->",props);
     setDummyDishDetails(props)
     setModalDishId(props.id);
     console.log("values==",dummyDishDetails);
       }

    const handleClose = () =>{
      setShow(false); 
      setDummyDishDetails({});
    }  
   
   const handleUpdateChange=(e)=>  
   {
          const {name ,value}=e.target;   
       console.log(name,"vale",value);
       setDummyDishDetails({
         ...dummyDishDetails,
         [name] :value
       });


      }//closing



   let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
   let r_id=localStorage.getItem('id');
   useEffect(()=>{
    axios({
      method: "get",
      url:server_url+`/getDishes?id=${r_id}`,
      headers: { "Content-Type": "application/json","Authorization": bearer  }
      
    })
      .then((response) => {
       
       setDishDetails(response.data);
      
       console.log("PPP",response.data);
       console.log("Details",dishDetails);
      })
      .catch((error) => {
        console.log((error.response));
      });
  },[showDishesModal,modalDishID])
    

    //Update dishes  
    const UpdateDishes=(e)=>{
      console.log("THESE ARE THE DETAILS ",dummyDishDetails);
      axios({
        method: "post", url: `http://localhost:4000/updateDish`,
        headers: { "Content-Type": "application/json","Authorization": bearer  },
        data:dummyDishDetails
      })
        .then((response) => {
          setModalDishId();
         // ModalToggle();
        })
        .catch((error) => {
            //alert("PP");
          console.log(("Error----------------",error));
        });


    }

     const ModalToggle=()=>{
        setShowDishesModal(!showDishesModal);
     }
    return(
    <Container style={{paddingRight:"10%"}}>
        <Row>
            <div className="col-sm-6">
            
            </div>
            <div className="col-sm-3">
                
            </div>
            <div className="col-sm-3">
               {showDishesModal && <DishesAddModal val={showDishesModal} ModalToggle={ModalToggle}/>}
            <Button onClick={()=>{setShowDishesModal(true)}} style={{width:'50%'}}> Add</Button>
                <Button style={{width:"48%",marginLeft:"2%"}}> Delete</Button>
            </div>
        </Row>
        <Row>
            <div className="col-sm">
                <Dropdown>
                    <Dropdown.Toggle id="cateogary_dish">
                        <span id="cateogary_drop_text">Category</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item onClick={()=>{setDropDown(6)}}>All</Dropdown.Item>
                         <Dropdown.Item onClick={()=>{setDropDown(1)}}>Appetizer</Dropdown.Item>
                         <Dropdown.Item onClick={()=>{setDropDown(2)}}>Salads</Dropdown.Item>
                         <Dropdown.Item onClick={()=>{setDropDown(3)}}>Main Course</Dropdown.Item>
                         <Dropdown.Item onClick={()=>{setDropDown(4)}}>Desserts</Dropdown.Item>
                         <Dropdown.Item onClick={()=>{setDropDown(5)}}>Beverages</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Row>
        <Row style={{paddingTop:"3%"}}>
            <div className="col-sm-6">
              { dropDown==1 && <div id="Dish_Cat_text"><span><BiIcons.BiFoodMenu/> </span> Appetizer</div>}
              { dropDown==2 && <div id="Dish_Cat_text"><span><BiIcons.BiFoodMenu/> </span> Salads</div>}
              { dropDown==3 && <div id="Dish_Cat_text"><span><BiIcons.BiFoodMenu/> </span> Main Course</div>}
              { dropDown==4 && <div id="Dish_Cat_text"><span><BiIcons.BiFoodMenu/> </span> Desserts</div>}
              { dropDown==5 && <div id="Dish_Cat_text"><span><BiIcons.BiFoodMenu/> </span> Beverages</div>}
              { dropDown==6 && <div id="Dish_Cat_text"><span><BiIcons.BiFoodMenu/> </span> All</div>}
                    
            </div>
        </Row>
        <Row>
                <hr className="one"></hr>
            </Row>
            <Row style={{paddingTop:"2%"}}>
        {
            dishDetails.map(dish=>{
                return(
                
                <div className="col-sm-4  d-flex align-items-stretch" style={{paddingTop:'1%',paddingBottom:'1%'}}>
                            <div className="card" onClick={()=>handleShow(dish)} style={{paddingLeft:'2%',cursor:'pointer'}}>
                            <div className="card-body" style={{padding:'0'}}>
                                <Row>
                                    <div className="col-sm-6 " >
                                       <h5 className="card-title">{dish.name}</h5>
                                        <p id="rest_card_text" className="card-text">{dish.description}</p>
                                        <p   className="card-text"><b>${dish.price}</b></p>
                                        
                                   </div>
                                   <div className="col-sm-6">
                                       <img style={{width:'100%',objectFit:'cover',height:'100%'}}  src={dish.images} alt="dish_image" />
                                 </div>
                                </Row>
                               
                                  
                             </div>   
                                 
                            </div>
                            {modalDishID==dish.id && 
                            
                            <Modal show={show} onHide={handleClose}>
                            <Modal.Header >
                              <Modal.Title>Edit Dish</Modal.Title>
                            </Modal.Header>
                            <Container fluid>
                            <Modal.Body>
                                
                            <Form style={{marginTop:'6%'}} id="customer_signup">
                                <Row>
                                    <div className="col-sm-3 text-center">
                                    <label for="Name">Name</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input style={{marginBottom:"8%"}} onChange={(e)=>{handleUpdateChange(e)}} type="text" name="name" defaultValue={dish.name}  required/>
                                    </div>
                            
                             </Row>
                             <Row>
                                    <div className="col-sm-3 text-center">
                                    <label for="Price">Price</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input style={{marginBottom:"8%"}} onChange={(e)=>{handleUpdateChange(e)}} type="text" name="price" defaultValue={dish.price} required/>
                                    </div>
                            
                             </Row>
                             <Row>
                             <Row>
                <div className="col-sm-3 text-center">
                <label for="category">Category</label>
                </div>
                <div className="col-sm-3">
                    <select  id="category" name="category" onChange={(e)=>{handleUpdateChange(e)}} defaultvalue={dish.cat} className="custom-select" >
                    <option value="1">Appetizer</option>
                    <option value="2">Salads</option>
                    <option value="3" >Main Course</option>
                    <option value="4">Desserts</option>
                    <option value="5">Beverages</option>
                   
                  </select>
                </div>
                               
         </Row>                            
                             </Row>
                             <Row  style={{paddingTop:"2%"}}>
                                    <div className="col-sm-3 text-center">
                                    <label for="Image">Image</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <input type="file"></input>
                                    <Button  style={{backgroundColor:"green",border:"none"}} defaultvalue={dish.images} name="Image">Click here to upload new image</Button>
                                    </div>
                            
                             </Row>
                             <Row style={{paddingTop:"2%"}}>
                                    <div className="col-sm-3 text-center">
                                    <label for="Ingredients">Ingredients</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <textarea type="text" class="form-control " name="Ingredients" onChange={(e)=>{handleUpdateChange(e)}} defaultValue={dish.ingredients} rows="5"></textarea>
                                    </div>
                            
                             </Row>
                             <Row style={{paddingTop:"2%"}}>
                                    <div className="col-sm-3 text-center">
                                    <label for="Description">Description</label>
                                    </div>
                                    <div className="col-sm-9">
                                    <textarea class="form-control "  onChange={(e)=>{handleUpdateChange(e)}} name="Description" defaultValue={dish.description} rows="5"></textarea>
                                    </div>
                            
                             </Row>
                             
                                    
                                               
                         </Form>
                         </Modal.Body>
                                </Container>
                    
                         
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" id="dish_form_modal" onClick={(e)=>{UpdateDishes(e)}}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                            
                            
                            }
            </div>
                )
            })
       
       }  
        </Row>
       
        
        
    </Container>)
}
export default RestDish;