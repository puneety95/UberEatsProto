import { Container,Row,Button,Modal } from "react-bootstrap";
import {useState,useEffect} from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import {useCart} from 'react-use-cart';
import {useSelector} from 'react-redux';
import 'reactjs-popup/dist/index.css';
import "@reach/dialog/styles.css";
import { server_url } from '../values';

import axios from 'axios';


function CustomerDish(props)
{ 
//console.log("Puneeet",props);
const { emptyCart } = useCart();
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [product, setProduct]=useState({});
    const { addItem,isEmpty ,items} = useCart();
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setShow(true);
      setModalDishId(id);
    }
    const [showDishesModal, setShowDishesModal]=useState(false);
    const [dropDown ,setDropDown] =useState(1);
   const [dishDetails,setDishDetails] =useState([{}]);
   const [modalDishID ,setModalDishId] =useState(false);
   const [count,setCount] = useState(0);
   const [show2, setShow2] = useState(false);

   const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

   const state3=useSelector((state)=>state.filter);
      console.log("filterssss are --->",state3);
      let filter_array=[];
      for(let i in state3.filter)
      {
        if(state3.filter[i]==true)
        {
          filter_array.push("'"+i+"'");
        }
       
      } 
 console.log(filter_array);
   let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
   let r_id=localStorage.getItem('id');
   useEffect(()=>{
    axios({
      method: "get",
      url: server_url+`/getDishes2?id=${props.id}&filter=${filter_array}`,
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
    
   
     const ModalToggle=()=>{
        setShowDishesModal(false);
     }

    
     let pp;
   

     const addToCart=(name,id,price)=>{
       
       if(count <0)
       {        
         alert("Quantity can't be negative");
       }
       
       let r_id=props.id;
       let n=props.n;
       let size=count;
       
        pp={name,id,price,size,n,r_id};
     
      console.log("value",pp);
      setProduct(pp);
    
      if(!isEmpty)
      {
        
        if(pp.r_id==items[0].r_id)
        {
         
          addItem(pp);
          
          alert("Items added to the Cart");
          setCount(0)
        }
        else
        {
         
        handleClose();
        setProduct(pp);  
        handleShow2();
         
        }

      }
      else
      {
        addItem(pp);
        alert("Items added to the Cart");
        setCount(0);
      }
      handleClose();
       //handleClose();
      
       //alert("Item Added to Cart");
     
       

     }

     const addcart=()=>{
      
      emptyCart();
      addItem(product);
      alert("Item added to cart");
      setCount(0);
      handleClose2();
     }
     
    return(
    <Container style={{paddingRight:"10%"}}>
        
       
        
        <Row>
                <hr className="one"></hr>
            </Row>
            <Row style={{paddingTop:"2%"}}>
        {
            dishDetails.map(dish=>{
                return(
                
                <div className="col-sm-4 " style={{paddingTop:'1%',paddingBottom:'1%'}}>
                            <div className="card card h-100" onClick={()=>handleShow(dish.id)} style={{paddingLeft:'2%',cursor:'pointer'}}>
                            <div className="card-body" style={{padding:'0'}}>
                                <Row>
                                    <div className="col-sm-6" >
                                       <h5 className="card-title">{dish.name}</h5>
                                       <div className="mt-auto">
                                        <p id="rest_card_text" className="card-text">{dish.description}</p>
                                        <p style={{fontSize:'x-large'}} id="rest_card_text"  className="card-text"><BiIcons.BiDollar/>{dish.price}</p>
                                        </div>
                                   </div>
                                   <div className="col-sm-6">
                                       <img style={{width:'100%',height:'20vh'}} id ="rest_dish_cat2" src={dish.images} alt="dish_image" />
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
                                       <img style={{width:'100%',height:'50vh'}} id ="rest_dish_cat2" src={dish.images} alt="dish_image" />
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
                                  <Button onClick={()=>setCount(count+1)} style={{backgroundColor:'black'}} className='rounded-circle'><FiIcons.FiPlus/> </Button>
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
       <Modal show={show2} onHide={handleClose2}>
        <Modal.Header >
          <Modal.Title>Create New Order ?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontWeight:'400'}}>Your order contains items from {show2?items[0].n : 2}. Click on continue to create new order and  
        add items from {product.n}</Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:'black'}} variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button onClick={addcart} style={{backgroundColor:'green'}} variant="primary">
            Continue
          </Button>
        </Modal.Footer>
      </Modal>



       
      
    </Container>)
}
export default CustomerDish;