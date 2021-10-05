import { Container,Form,Dropdown,Row,Button,Modal } from "react-bootstrap";
import {useState,useEffect} from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import {useCart} from 'react-use-cart';

//FiPlus ,FiMinus ,

import axios from 'axios';


function CustomerDish(props)
{
    const [show, setShow] = useState(false);
    const [product, setProduct]=useState({});
    const { addItem } = useCart();
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setShow(true);
      setModalDishId(id);
    }
    const [showDishesModal, setShowDishesModal]=useState(false);
    const [dropDown ,setDropDown] =useState(1);
   const [dishDetails,setDishDetails] =useState([{}]);
   const [modalDishID ,setModalDishId] =useState(false);
   const [count,setCount] = useState(1);

   let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
   let r_id=localStorage.getItem('id');
   useEffect(()=>{
    axios({
      method: "get",
      url: `http://localhost:4000/getDishes?id=44}`,
      headers: { "Content-Type": "application/json","Authorization": bearer  },
      
    })
      .then((response) => {
               
       setDishDetails(response.data);
       console.log("PPP",response.data);
       console.log("Details",dishDetails);
      })
      .catch((error) => {
        console.log((error.response));
      });
  },[])
    
    let dish_price="$100"
    let dish_image2="../food1.jpg";
    let dishDescription="chopped romaine, curly kale, quinoa & millet, housemade superfood krunchies, black bean, roasted corn & jicama succotash, red onions, cilantro, cotija cheese, grape tomatoes, avocado (400 cal) with chipotle vinaigrette (250 cal) + shaved, roasted chicken breast $3 (110 cal) vegetarian & gluten free";
     const ModalToggle=()=>{
        setShowDishesModal(false);
     }

     const addToCart=(name,id,price)=>{
       
       if(count <0)
       {        
         alert("Quantity can't be negative");
       }
       
       let r_id=props.id;
       let pp={name,id,price,count,r_id};
      
      console.log("value",pp);
      console.log("product =",product)
       setProduct(pp);
       console.log("ITems----",product);
       addItem(pp);
       
       //handleClose();
      
       alert("Item Added to Cart");
       setProduct({});
       

     }
    return(
    <Container style={{paddingRight:"10%"}}>
        
       
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
                
                <div className="col-sm-4" style={{paddingTop:'1%',paddingBottom:'1%'}}>
                            <div className="card" onClick={()=>handleShow(dish.id)} style={{paddingLeft:'2%',cursor:'pointer'}}>
                            <div className="card-body" style={{padding:'0'}}>
                                <Row>
                                    <div className="col-sm-6" >
                                       <h5 className="card-title">{dish.name}</h5>
                                        <p id="rest_card_text" className="card-text">{dish.description}</p>
                                        <p id="rest_card_text"  className="card-text">{dish.price}</p>
                                        
                                   </div>
                                   <div className="col-sm-6">
                                       <img style={{width:'100%'}} id ="rest_dish_cat2" src={dish.images} alt="dish_image" />
                                 </div>
                                </Row>
                               
                                  
                             </div>   
                                 
                            </div>
                            {modalDishID==dish.id && 
                            
                            <Modal show={show} onHide={handleClose}>
                            
                            <Container style={{padding:'0',paddingTop:'0'}}  >
                            <Modal.Body style={{padding:'0%'}}>
                           <Row>
                           <div className="col-sm-12">
                                       <img style={{width:'100%',height:'100%'}} id ="rest_dish_cat2" src={dish.images} alt="dish_image" />
                                 </div>
                           </Row>
                           <Row>
                           <div className="col-sm-12">
                             <h2 style={{paddingLeft:'4%',paddingTop:'3%'}}>{dish.name}</h2>
                             </div>
                           </Row> 
                           <Row>
                           <div className="col-sm-12">
                             <div style={{paddingLeft:'4%',paddingTop:'3%',wordWrap:'break-word'}}>Ingredients :{dish.ingredients}</div>
                             </div>
                           </Row>
                           <Row>
                           <div className="col-sm-12">
                             <div style={{paddingLeft:'4%',paddingTop:'3%',wordWrap:'break-word'}}>{dish.description}</div>
                             </div>
                           </Row>
                         </Modal.Body>
                                </Container>
                    
                              <Row style={{paddingLeft:'4%',paddingTop:'3%',paddingBottom:'1%'}}>
                                <div className='col-sm-5' style={{paddingRight:'0%'}}>
                                  <Button onClick={()=>setCount(count-1)} style={{backgroundColor:'black'}} className='rounded-circle'><FiIcons.FiMinus/></Button>
                                  <span style={{fontSize:'20px',paddingTop:'1%',paddingLeft:'3%',paddingRight:'3%'}}>{count}</span>
                                  <Button onClick={(prevState)=>setCount(count+1)} style={{backgroundColor:'black'}} className='rounded-circle'><FiIcons.FiPlus/> </Button>
                                </div>

                                <div style={{fontSize:'20px',backgroundColor:'beige'}} className='col-sm-3'>
                                  $ {count * dish.price}
                                </div>
                                <div style={{fontSize:'20px'}} className='col-sm-3 text-center'>
                                 <Button onClick={()=>addToCart(dish.name,dish.id,dish.price)} style={{backgroundColor:'green'}}>Add</Button>
                                </div>
                                
                              </Row>

                         
                          </Modal>
                            
                            
                            }
            </div>
                )
            })
       
       }  
        </Row>
       
        
        
    </Container>)
}
export default CustomerDish;