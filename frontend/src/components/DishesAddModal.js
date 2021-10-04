import {Container,Modal,Button,Form,Row} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
function DishesAddModal(props)
{
    
    const [show, setShow] = useState(props.val);
    const [addDetail,setAddDetails] = useState({category:'1'});
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 

   //To update details in the state of the newly added data 

   const handleUpdateChange=(e)=>  
    {
        let ele = document.getElementById("addDishForm");
        let chk_status = ele.checkValidity();
         ele.reportValidity();
   
    if (!chk_status) {
      return;
    }
        const {name ,value}=e.target;   
        console.log(name,"vale",value);
        setAddDetails(prevState=>({
          ...prevState,
          [name] :value
        }));
       }


    const  addDish=async(e)=>{
        let ele = document.getElementById("addDishForm");
        let chk_status = ele.checkValidity();
         ele.reportValidity();
   
    if (!chk_status) {
      return;
    }
        e.preventDefault();
        const imageInput = document.querySelector("#imageInput");
        const file = imageInput.files[0];
        const { url } = await fetch("http://localhost:4000/s3Url").then(res => res.json())
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
      let data ={imageUrl,id,...addDetail};
      await axios({
        method:"POST",
        url:"http://localhost:4000/RestDishesAdd",
        headers:{"Content-Type":"application/json","Authorization": bearer},
        data: data
      }).then((res)=>{
        console.log("Image Uploaded")
      })
      .catch((error)=>{
        alert("There were some errrs while updating image photo");
      })

    }

    
    return(
       <Container>
            <Modal show={show} onHide={props.ModalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Add Dishes</Modal.Title>
        </Modal.Header>
        <Container fluid>
        <Modal.Body>
            
        <Form style={{marginTop:'6%'}} id="addDishForm">
            <Row>
                <div className="col-sm-3 text-center">
                <label for="name">Name</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{handleUpdateChange(e)}} style={{marginBottom:"8%"}} type="text" name="name" required  />
                </div>
        
         </Row>
         <Row>
                <div className="col-sm-3 text-center">
                <label for="price">Price</label>
                </div>
                <div className="col-sm-9">
                <input onChange={(e)=>{handleUpdateChange(e)}}  style={{marginBottom:"8%"}} type="text" name="price" required  />
                </div>
        
         </Row>
         
         
         <Row>
                <div className="col-sm-3 text-center">
                <label for="category">Category</label>
                </div>
                <div className="col-sm-3">
                    <select onChange={(e)=>{handleUpdateChange(e)}}  id="category" name="category" className="custom-select" >
                    <option value="1">Appetizer</option>
                    <option value="2">Salads</option>
                    <option value="3" >Main Course</option>
                    <option value="4">Desserts</option>
                    <option value="5">Beverages</option>
                   
                  </select>
                </div>
                               
         </Row>
         <Row style={{paddingTop:"3%"}}>
         <div className="col-sm-3 text-center">
         <label for="dish_image">Image</label>
             </div>
         <div className="col-sm-3 ">
             <input id="imageInput" type='file'/>
             </div>
        </Row>
         <Row style={{paddingTop:"2%"}}>
                <div className="col-sm-3 text-center">
                <label for="ingredients">Ingredients</label>
                </div>
                <div className="col-sm-9">
                <textarea onChange={(e)=>{handleUpdateChange(e)}} class="form-control " name="ingredients" required   rows="5"></textarea>
                </div>
                
         </Row>
         <Row style={{paddingTop:"2%"}}>
                <div className="col-sm-3 text-center">
                <label for="description">Description</label>
                </div>
                <div className="col-sm-9">
                <textarea onChange={(e)=>{handleUpdateChange(e)}} class="form-control " name="description" required  rows="5"></textarea>
                </div>
                
         </Row>
                           
     </Form>
     </Modal.Body>
            </Container>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.ModalToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>{addDish(e)}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
    )

}

export default DishesAddModal;