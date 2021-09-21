import { Container,Row } from "react-bootstrap";
import "./Dashboard.css";
import Image from 'react-bootstrap/Image'
import * as MdIcons from "react-icons/md";


function Dashboard()
{
    let cover_image=".../public/Images/food1.jpg";
    let rest_name="Moti Mahal";
    let timings="10pm-5pm"
    let address="3090 Olsen Dr , Suite 150, San Jose, CA 95128";
    let description="Wish you could ask someone what's popular here? The impossible taco salad is one of the most ordered items of the 77 things on the menu and the avocado & quinoa superfood ensalada salad and the “not so fried” chicken sandwich are two of the items most commonly ordered together at this trending midday go-to. • $ • Sandwiches • American • Healthy • Salads • Family Friendly"
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

            <Row id="rest_description" style={{paddingLeft:'3%',paddingTop:'1%',textAlign:'justify'}}>
                <div className="col-sm-9">
                    {description}
                </div>
                
            </Row>            
            <Row style={{paddingLeft:'3%',paddingTop:'1%',fontWeight:500}}>
                <div className="col-sm-8">
                    <MdIcons.MdLocationOn/>
                    {address}
                </div>
            </Row>
       </Container>
       
       
    );
}
export default Dashboard;