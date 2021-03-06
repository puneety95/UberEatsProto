import {Row,Col,Container} from 'react-bootstrap';
import axios from 'axios';
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import {useEffect,useState} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import React from 'react';
import {useSelector} from 'react-redux';
import {bindActionCreators} from "redux";
import {useDispatch} from 'react-redux';
import {filter_details} from '../state/action-creators/actions';
import { server_url } from '../values';
//import { search } from '../../../backend/routes/customerRoutes';


//GiThreeLeaves GiChickenOven RiRestaurantFill

function Home()
{
  const location=useLocation(); 
  
  const dispatch=useDispatch();
  const state2=useSelector((state)=>state.delivery);
   const [loadResult,setLoadResult] = useState();
  console.log(state2);

  const state_location=useSelector((state)=>state.location);
  console.log("------------------------state location--------------",state_location);
   //const [loc,setLoc] = useState("");
 
  
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [restList,setRestList] = useState([]);
    const [filter,setFilter] = useState({veg:false,nonVeg:false,vegan:false});
   // const [search,setSearch] =useState(); 
    let search=location.searchCriteria;
    console.log("Locatoin ---------->",search);
   
      
   
      
    
    let id=localStorage.getItem('id');
    const history =useHistory();
    const restOpen=(id)=>{
        history.push('/dash/'+id);
    }

    const handleFilterChange=(e)=>  
      {
     const {id ,checked}=e.target;        
     setFilter(prevState=>({
       ...prevState,
       [id] :checked
     }));

      
    }
    
    const duplicate_remove=()=>{
      let jsonObject = restList.map(JSON.stringify);
     let  uniqueSet = new Set(jsonObject);
     let  uniqueArray = Array.from(uniqueSet).map(JSON.parse);

     setRestList(uniqueArray);

    }
  

    const state3=useSelector((state)=>state.filter);
    
   
    useEffect(()=>{
      
      const filterGetDetails2=bindActionCreators(filter_details,dispatch);
      let data={filter}      
      filterGetDetails2(data);
      //converting filter json to array
      let filter_array=[];
      for(let i in filter)
      {
        if(filter[i]==true)
        {
          filter_array.push("'"+i+"'");
        }
       
      }    
      
        axios({
          method: "get",
          url: server_url+`/getRestaurant?id=${id}&type=${state2.toggle}&filter=${filter_array}&search=${search}&location=${state_location.location}`,
          headers: { "Content-Type": "application/json","Authorization": bearer  },
          
        })
          .then((response) => {
            setRestList(response.data);
           //duplicate_remove();

           console.log("List of restaurants",response.data);
          
          })
          .catch((error) => {
            console.log((error.response));
          });
      },[state2,filter,search,state_location])
 
    console.log("PPPPPPPPPPP___",state3.filter);
    return (
        <Container>

            <Row style={{paddingTop:"3%"}}>
                <div className="col-sm ">
                <div class="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="veg" value="option1" onChange={(e)=>{handleFilterChange(e)}}/>
                        <label className="form-check-label" for="inlineCheckbox1"><GiIcons.GiThreeLeaves/>Veg</label>
                </div>
                <div className="form-check form-check-inline">
                     <input className="form-check-input" type="checkbox" id="nonveg" value="option2" onChange={(e)=>{handleFilterChange(e)}}/>
                     <label className="form-check-label" for="inlineCheckbox2"><GiIcons.GiChickenOven/>Non-Veg</label>
                </div>
                <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" id="vegan" value="option3" onChange={(e)=>{handleFilterChange(e)}} />
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
            <div className="col-sm-3 d-flex align-items-stretch" style={{paddingTop:'1%',paddingBottom:'1%'}}>
                            <div className="card" onClick={()=>restOpen(rest.r_id)} style={{cursor:'pointer'}}>
                            <div className="card-body" style={{padding:'0'}}>
                                       <img style={{width:'100%'}} id ="rest_dish_cat2" src={rest.profile_pic} alt="dish_image" />
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
export default Home;