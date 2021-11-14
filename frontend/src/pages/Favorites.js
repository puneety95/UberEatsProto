import {Row,Col,Container} from 'react-bootstrap';
import axios from 'axios';
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import React from 'react';
import { server_url } from '../values';
//GiThreeLeaves GiChickenOven RiRestaurantFill

function Favorites()
{
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [restList,setRestList] = useState([]);
    let id=localStorage.getItem('id');
    const history =useHistory();
    const restOpen=(id)=>{
        history.push('/dash/'+id);
    }

    useEffect(()=>{
        axios({
          method: "get",
          url: server_url+`/getFavourites?id=${id}`,
          headers: { "Content-Type": "application/json","Authorization": bearer  },
          
        })
          .then((response) => {
            setRestList(response.data);
           console.log("Data of favourites",response.data);
           //console.log("Details",setRestList);
          })
          .catch((error) => {
            console.log((error.response));
          });
      },[])

    return (
        <Container>

            <Row style={{paddingTop:"3%"}}>
                <div className="col-sm ">
                <div class="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                        <label className="form-check-label" for="inlineCheckbox1"><GiIcons.GiThreeLeaves/>Veg</label>
                </div>
                <div className="form-check form-check-inline">
                     <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                     <label className="form-check-label" for="inlineCheckbox2"><GiIcons.GiChickenOven/>Non-Veg</label>
                </div>
                <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
                     <label className="form-check-label" for="inlineCheckbox3"><GiIcons.GiPawHeart/>Vegan</label>
                </div>
                </div>
            </Row>
            <Row>
                <hr className="one"></hr>
            </Row>

            <Row style={{paddingTop:'3%'}}>
                {
                    
                    restList.map(rest=>{
           return(
            <div className="col-sm-3" style={{paddingTop:'1%',paddingBottom:'1%'}}>
                            <div className="card" onClick={()=>restOpen(rest.r_id)} style={{cursor:'pointer'}}>
                            <div className="card-body" style={{padding:'0'}}>
                                                                  
                                   <Row>
                                   <div className="col-sm">   
                                       <img style={{width:'100%'}} id ="rest_dish_cat2" src={rest.profile_pic} alt="dish_image" />
                                 </div>
                                   </Row>
                                   <Row>
                                   <div className="col-sm">   
                                       <div style={{fontSize:'larger',fontWeight:'400',paddingTop:'1%'}}><RiIcons.RiRestaurantFill/>{rest.pop_name[0].name}</div>
                                     </div>
                                   </Row>
                               
                             </div>   
                                 
                            </div>
                        </div>
                     ) })  
                }
            
        
           </Row>
                


        </Container>



    );
}
export default Favorites;