import { Container,Form,Dropdown,Row,Button,Modal } from "react-bootstrap";
import {useState} from 'react';
import * as BiIcons from 'react-icons/bi';

 


function RestDish()
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const [dropDown ,setDropDown] =useState(1);
  
    let dish_price="$100"
    let dish_image2="../food1.jpg";
    let dishDescription="chopped romaine, curly kale, quinoa & millet, housemade superfood krunchies, black bean, roasted corn & jicama succotash, red onions, cilantro, cotija cheese, grape tomatoes, avocado (400 cal) with chipotle vinaigrette (250 cal) + shaved, roasted chicken breast $3 (110 cal) vegetarian & gluten free";
    return(
    <Container style={{paddingRight:"10%"}}>
        <Row>
            <div className="col-sm-6">
            
            </div>
            <div className="col-sm-3">
                
            </div>
            <div className="col-sm-3">
            <Button style={{width:'50%'}}> Add</Button>
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
        <div className="col-sm-4" style={{paddingTop:'1%'}}>
                    <div className="card" onClick={handleShow} style={{paddingLeft:'2%',cursor:'pointer'}}>
                    <div className="card-body" style={{padding:'0'}}>
                        <Row>
                            <div className="col-sm-6" >
                               <h5 className="card-title">Butter Chicken</h5>
                                <p id="rest_card_text" className="card-text">{dishDescription}</p>
                                <p id="rest_card_text"  className="card-text">{dish_price}</p>
                                
                           </div>
                           <div className="col-sm-6">
                               <img style={{width:'100%'}} id ="rest_dish_cat2" src={dish_image2} alt="dish_image" />
                         </div>
                        </Row>
                       
                          
                     </div>   
                         
                    </div>
                </div>

                <div className="col-sm-4" style={{paddingTop:'1%'}}>
                    <div className="card"  style={{padding:'0'}}>
                    <div className="card-body" style={{padding:'0'}}>
                        <Row>
                            <div className="col-sm-6" >
                               <h5 className="card-title">Butter Chicken</h5>
                                <p id="rest_card_text" className="card-text">{dishDescription}</p>
                                <p id="rest_card_text" className="card-text">{dish_price}</p>
                                
                           </div>
                           <div className="col-sm-6">
                               <img style={{width:'100%'}} id ="rest_dish_cat2" src={dish_image2} alt="dish_image" />
                         </div>
                        </Row>
                       
                          
                     </div>   
                         
                    </div>
                </div>
                <div className="col-sm-4" style={{paddingTop:'1%'}}>
                    <div className="card"  style={{padding:'0'}}>
                    <div className="card-body" style={{padding:'0'}}>
                        <Row>
                            <div className="col-sm-6" >
                               <h5 className="card-title">Butter Chicken</h5>
                                <p id="rest_card_text" className="card-text">{dishDescription}</p>
                                <p id="rest_card_text" className="card-text">{dish_price}</p>
                                
                           </div>
                           <div className="col-sm-6">
                               <img  style={{width:'100%'}} id ="rest_dish_cat2" src={dish_image2} alt="dish_image" />
                         </div>
                        </Row>
                       
                          
                     </div>   
                         
                    </div>
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
                <label for="Name">Name</label>
                </div>
                <div className="col-sm-9">
                <input style={{marginBottom:"8%"}} type="text" name="Name"  required/>
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="Price">Price</label>
                </div>
                <div className="col-sm-9">
                <input style={{marginBottom:"8%"}} type="text" name="Price"  required/>
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="Price">Category</label>
                </div>
                <div className="col-sm-9">
                <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:"green",border:"none"}} id="cateogary_dish">
                        <span id="cateogary_drop_text" >Category</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item >Appetizer</Dropdown.Item>
                         <Dropdown.Item >Salads</Dropdown.Item>
                         <Dropdown.Item >Main Course</Dropdown.Item>
                         <Dropdown.Item >Desserts</Dropdown.Item>
                         <Dropdown.Item >Beverages</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
        
         </Row>
         <Row  style={{paddingTop:"2%"}}>
                <div className="col-sm-3 text-center">
                <label for="Image">Image</label>
                </div>
                <div className="col-sm-9">
                <Button  style={{backgroundColor:"green",border:"none"}} name="Image">Click here to upload new image</Button>
                </div>
        
         </Row>
         <Row style={{paddingTop:"2%"}}>
                <div className="col-sm-3 text-center">
                <label for="Ingredients">Ingredients</label>
                </div>
                <div className="col-sm-9">
                <textarea class="form-control " name="Ingredients" rows="5"></textarea>
                </div>
        
         </Row>
         <Row style={{paddingTop:"2%"}}>
                <div className="col-sm-3 text-center">
                <label for="Description">Description</label>
                </div>
                <div className="col-sm-9">
                <textarea class="form-control " name="Description" rows="5"></textarea>
                </div>
        
         </Row>
         
                
                           
     </Form>
     </Modal.Body>
            </Container>

     
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" id="dish_form_modal" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        
        
    </Container>)
}
export default RestDish;