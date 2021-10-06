import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import {useCart} from "react-use-cart";
import * as FiIcons from 'react-icons/fi';
import * as GrIcons from 'react-icons/gr';
import {Link} from 'react-router-dom';
function Cart(props) {
 
  const [show, setShow] = useState(true);
  const [qty,ChangeQty]  =useState(true);
  
  const handleClose = () => {
      setShow(false);
      props.p();
  }

  const changeQty=(item_id,value)=>{
    for(let i in items)
    {
        if(items[i].id==item_id)
        {
          items[i].quantity=value;
          ChangeQty(!qty);

        }  
    }

  }
  
  
 
  const { items } = useCart();
  console.log(items);
 
  return (
    <Container>
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          
        <Modal.Title >Cart</Modal.Title>
            <GrIcons.GrClose style={{cursor:'pointer'}} onClick={handleClose}/>  
          
        
        </Modal.Header>
        <Modal.Body>

        <ul>
        {items.map((item) => (  
          <li key={item.id}>
             
             <Row>
             <div className="col-sm-1">
             <select onChange={(e)=>{changeQty(item.id,e.target.value)}} value = {item.quantity} name="qty" id="qty">
               <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  
             </select>
             </div>
               <div style={{paddingLeft:'4%'}} className='col-sm-6'>
                <b> {item.name}</b>
               </div>
               <div className='col-sm-3'>
                 {item.price} x {item.quantity}
               </div>
               <div className='col-sm-2 text-right'>
                <FiIcons.FiDollarSign/> {item.price * item.quantity}
               </div>
             </Row>
            
          </li>
        ))}
      </ul>
       
        </Modal.Body>
        <Modal.Footer style={{padding:'0',paddingLeft:'0'}}>
        <Row style={{flex:'1'}}>
         <div className='col-sm-12'>
       <Link to='/checkout'>  <Button  onClick={handleClose} style={{backgroundColor:'green',width:'-webkit-fill-available'}}>Go To Check Out</Button> </Link>
         </div>
       </Row>
         </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default Cart;
