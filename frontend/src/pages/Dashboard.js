import { Container,Row ,Button} from "react-bootstrap";
import "./Dashboard.css";
import Image from 'react-bootstrap/Image'
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

function change_cat_color(id)
{
    //var id = $(this).parent().attr("id");
    for(let i=0;i<=4;i++)
    {
        let par_ele=document.getElementById('cat_row_2').children[i];
        par_ele.style.borderBottomColor="white";    
    }
  
   let par=document.getElementById(id);
   par=par.parentNode.id;
   document.getElementById(par).style.borderBottomColor="black";
   

}
function Dashboard()
{
    let cover_image=".../public/Images/food1.jpg";
    let dish_image="/public/Images/dish1.jpeg";
    let dish_price="$10";
    let dish_image2="./food1.jpg";
    let rest_name="Moti Mahal";
    let timings="10pm-5pm"
    let address="3090 Olsen Dr , Suite 150, San Jose, CA 95128";
    let contact="9911294357";
    let description="Wish you could ask someone what's popular here? The impossible taco salad is one of the most ordered items of the 77 things on the menu and the avocado & quinoa superfood ensalada salad and the “not so fried” chicken sandwich are two of the items most commonly ordered together at this trending midday go-to. • $ • Sandwiches • American • Healthy • Salads • Family Friendly"
    let dishDescription="chopped romaine, curly kale, quinoa & millet, housemade superfood krunchies, black bean, roasted corn & jicama succotash, red onions, cilantro, cotija cheese, grape tomatoes, avocado (400 cal) with chipotle vinaigrette (250 cal) + shaved, roasted chicken breast $3 (110 cal) vegetarian & gluten free";
    return (
        
        <Container fluid style={{padding:0,overflowX:'hidden'}}>
           
            <Row>
                <div className="image_over_Text">
                 <Image style={{width:'100%',height:'240px',objectFit:'cover'}}  src={require("./food1.jpg").default} alt="cover_image" /> 
                 <div className="bottom-left">
                     <p>{rest_name} <span style={{fontSize:'20px',}}>Timings : {timings}</span></p>
                
                 </div>
                 
               </div>
            </Row>

            <Row id="rest_description" style={{paddingLeft:'3%',paddingRight:'3%',paddingTop:'1%',textAlign:'justify'}}>
                <div className="col-sm-8">
                    {description}
                </div>
                
            </Row>            
            <Row style={{paddingLeft:'3%',paddingTop:'1%',fontWeight:500}}>
                <div className="col-sm-8">
                    <MdIcons.MdLocationOn/>
                    {address}
                </div>
            </Row>
            <Row style={{paddingLeft:'3%',paddingTop:'0%',fontWeight:500}}>
                <div className="col-sm-8">
                    <FaIcons.FaPhoneVolume/>
                    {contact}
                </div>
            </Row>
            <Row id="cat_row_2" style={{paddingLeft:'0%',paddingTop:'3%',justifyContent:'space-evenly'}}>
                <div style={{borderColor:'white',borderStyle:'solid'}} id="cat_buttons1" className="col-sm-2 text-center">
                    <Button style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id)}} id="rest_button1">Appetizers</Button>
                </div>
                <div  style={{borderColor:'white',borderStyle:'solid'}} id="cat_buttons2" className="col-sm-2 text-center">
                    <Button style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id)}} id="rest_button2">Salads</Button>
                </div>
                <div  style={{borderColor:'white',borderStyle:'solid'}} id="cat_buttons3" className="col-sm-2 text-center">
                    <Button style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id)}} id="rest_button3">Main Course</Button>
                </div>
                <div  style={{borderColor:'white',borderStyle:'solid'}} id="cat_buttons4" className="col-sm-2 text-center">
                    <Button style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id)}} id="rest_button4">Deserts</Button>
                </div>
                <div  style={{borderColor:'white',borderStyle:'solid'}} id="cat_buttons5" className="col-sm-2 text-center">
                    <Button style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id)}} id="rest_button5">Beverages</Button>
                </div>
            </Row>
            <Row>
                <hr class="one" ></hr>
            </Row>

            <Row style={{paddingLeft:'3%',paddingTop:'1%',fontWeight:500}}>
               <h4>APPETIZERS</h4>
            </Row>
            
            <Row  style={{paddingLeft:'3%',paddingRight:'3%',paddingTop:'1%'}}>
                
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
                            <div className="col-sm-6">
                               <h5 className="card-title">Butter Chicken</h5>
                                <p id="rest_card_text" className="card-text">{dishDescription}</p>
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
                            <div className="col-sm-6">
                               <h5 className="card-title">Butter Chicken</h5>
                                <p id="rest_card_text" className="card-text">{dishDescription}</p>
                           </div>
                           <div className="col-sm-6">
                               <img style={{width:'100%'}} id ="rest_dish_cat2" src={dish_image2} alt="dish_image" />
                         </div>
                        </Row>
                          
                     </div>   
                         
                    </div>
                </div>
                
            </Row>
       </Container>
       
       
    );
}
export default Dashboard;