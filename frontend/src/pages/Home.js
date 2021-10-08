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
//import { search } from '../../../backend/routes/customerRoutes';


//GiThreeLeaves GiChickenOven RiRestaurantFill

function Home()
{
  const location=useLocation(); 
  
  
  
  const dispatch=useDispatch();
  const state2=useSelector((state)=>state.delivery);
   const [loadResult,setLoadResult] = useState();
  console.log(state2);
  
    let bearer= 'Bearer '+localStorage.getItem('accessToken'); 
    const [restList,setRestList] = useState([{}]);
    const [filter,setFilter] = useState({veg:false,nonVeg:false,vegan:false});
   // const [search,setSearch] =useState(); 
    let search=location.searchCriteria;
   
      
   
      
    
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
          url: `http://localhost:4000/getRestaurant?id=${id}&type=${state2.toggle}&filter=${filter_array}&search=${search}`,
          headers: { "Content-Type": "application/json","Authorization": bearer  },
          
        })
          .then((response) => {
            setRestList(response.data);
           console.log("PPP",response.data);
          
          })
          .catch((error) => {
            console.log((error.response));
          });
      },[state2,filter,search])
 
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
            <div className="col-sm-3" style={{paddingTop:'1%',paddingBottom:'1%'}}>
                            <div className="card" onClick={()=>restOpen(rest.r_id)} style={{cursor:'pointer'}}>
                            <div className="card-body" style={{padding:'0'}}>
                                                                  
                                   <Row>
                                   <div className="col-sm">   
                                       <img style={{width:'100%'}} id ="rest_dish_cat2" src="https://uber-eats-proto-pun.s3.us-west-1.amazonaws.com/00e0a1ca6a597082c68ace3f6da3ffbd" alt="dish_image" />
                                 </div>
                                   </Row>
                                   <Row>
                                   <div className="col-sm">   
                                       <div style={{fontSize:'larger',fontWeight:'400',paddingTop:'1%'}}><RiIcons.RiRestaurantFill/>{rest.name}</div>
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