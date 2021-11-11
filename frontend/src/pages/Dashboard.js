import { Container,Row ,Button} from "react-bootstrap";
import "./Dashboard.css";
import Image from 'react-bootstrap/Image'
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import {useHistory,useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';
import CustomerDish from "../components/CustomerDish";
import Heart from "react-animated-heart";
import { server_url } from '../values';




function Dashboard()
{
    const {id} = useParams();
    

    const [isHeart, setIsHeart] = useState(false);
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
     const [restDetails,setRestDetails] =useState({});
       

      useEffect(()=>{
        axios({
            method: "get",
            url: server_url+`/getRestaurantCustomer?id=${id}`,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            
            
          })
            .then((response) => {
              console.log("Inside ---------------------------------------------",response);
              setRestDetails(response.data);
             console.log("Details---------------",restDetails);
            })
            .catch((error) => {
                //alert("PP");
              console.log(("Error----------------",error));
            });

            let uid=localStorage.getItem('id');
        
            axios({
                method: "get",
                url: server_url+`/getHeart?id=${id}&uid=${uid}}`,
                headers: { "Content-Type": "application/json","Authorization": bearer  },
                })
                .then((response) => {
                    if(response.data.length > 0)
                    {
                     setIsHeart(true);
                    }
                })
                .catch((error) => {
                    //alert("PP");
                  console.log(("Error----------------",error));
                });





      },[])


     const favouriteHandler=()=>{
         let check=0;
          setIsHeart(!isHeart);
         //0 means not favourite
         if(isHeart)
         {
             check=1;
         }
         let uid=localStorage.getItem('id');
         let data={id,uid,check};
         axios({
            method: "post",
            url: server_url+`/addfavourite`,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            data:data
            
          })
            .then((response) => {
             // alert("Restaurant added as favourite");
            })
            .catch((error) => {
                //alert("PP");
              console.log(("Error----------------",error));
            });
     }



    
    return (
        
        <Container fluid style={{padding:0,overflowX:'hidden'}}>
           
            <Row>
                <div className="image_over_Text">
                 <Image style={{width:'100%',height:'240px',objectFit:'cover'}}  src={restDetails.profile_pic} alt="cover_image" /> 
                 <div className="bottom-left">
                     <p>{restDetails.name} <span style={{fontSize:'20px',}}>Timings : "10-10-23"</span></p>
                
                 </div>
                 
               </div>
            </Row>

            <Row id="rest_description" style={{paddingLeft:'3%',paddingRight:'3%',paddingTop:'1%',textAlign:'justify'}}>
                <div className="col-sm-8">
                    {restDetails.r_description}
                    <Row style={{paddingLeft:'3%',paddingTop:'2%',fontWeight:500}}>
                <div className="col-sm-8">
                    <MdIcons.MdLocationOn/>
                    {restDetails.location}
                </div>
            </Row>
            <Row style={{paddingLeft:'3%',paddingTop:'0%',fontWeight:500}}>
                <div className="col-sm-8">
                    <FaIcons.FaPhoneVolume/>
                    {restDetails.r_contact}
                </div>
            </Row>
                </div>
                <div className="col-sm-4">
                <Heart isClick={isHeart} onClick={() => favouriteHandler()} />
                </div>
                
            </Row>            
           
           
            {/* <Row>
                <hr class="one" ></hr>
            </Row> */}

            {/* <Row style={{paddingLeft:'3%',paddingTop:'1%',fontWeight:500}}>
               <h4>APPETIZERS</h4>
            </Row> */}
            
            

            <Row>
                <Container>
             <CustomerDish id={id} n={restDetails.name} />
             </Container>

            </Row>

       </Container>
       
       
    );
}
export default Dashboard;