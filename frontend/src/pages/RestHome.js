import {Container,Row,Button} from 'react-bootstrap';
import './RestHome.css';
import RestProfile from "./RestProfile";
import RestDish from "../components/RestDish";
import RestPic from "../components/RestPic";
import {useState} from 'react';


function change_cat_color(id)
{
   for(let i=0;i<=2;i++)
    {
     let par_ele=document.getElementById('cat_row_2').children[i];
     par_ele.style.borderBottomColor="white";    
    }
    let par=document.getElementById(id);
    par=par.parentNode.id;
    document.getElementById(par).style.borderBottomColor="black";
}



function RestHome()
{   
    const [homeToggle ,setHomeToggle] =useState(1);
  
    return(
       
         <Container >
            
            <Row id="cat_row_2" style={{paddingLeft:'0%',paddingTop:'3%',justifyContent:'center'}}>
                <div style={{borderColor:'white',borderBottomColor:"black" ,borderStyle:'solid'}} id="cat_buttons1" className="col-sm-2 text-center">
                    <Button  className="shadow-none" style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id);setHomeToggle(1)}} id="rest_button1">Profile</Button>
                </div>
                <div  style={{borderColor:'white',borderStyle:'solid'}} id="cat_buttons2" className="col-sm-2 text-center">
                    <Button   className="shadow-none" style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id);setHomeToggle(2)}} id="rest_button2">Dishes</Button>
                </div>
                <div  style={{borderColor:'white',borderStyle:'solid'}} id="cat_buttons3" className="col-sm-2 text-center">
                    <Button  className="shadow-none" style={{backgroundColor:'white',color:'black',border:'none'}} onClick={(e)=>{change_cat_color(e.target.id);setHomeToggle(3)}} id="rest_button3">Pictures</Button>
                </div>
                                
            </Row>
            <Row>
                <hr className="one"></hr>
            </Row>
            { homeToggle==1 ? <RestProfile/> :  homeToggle==2 ? <RestDish/> : <RestPic/>} 
       
        </Container>    
    );

}
export default RestHome;