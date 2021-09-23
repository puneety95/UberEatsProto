import "./App.css";
import RouteCustomer from "./RouteCustomer";
import RouteRest  from "./RouteRest";
import {useEffect,useRef, useState} from "react";
import {useLocation,useHistory} from "react-router-dom";


import RouteLogin from "./RouteLogin";
 function App() {
  
   let loc = useLocation();
   let history = useHistory();
  // let isLogin=useRef(false);
 // const [isLogin,setIsLogin]=useState(false);
   
   
   // useEffect(()=>{
     
   //    if(localStorage.getItem('accessToken'))
   //    {
        
   //       setIsLogin
   //    }
   //    else{
   //       isLogin.current=false;
   //       //history.push('/login');
   //    }
   // },[loc])

   //let issLogin=true;


  return (
     
     <div>
        {localStorage.getItem('accessToken')? <RouteRest/> : <RouteLogin/>}
          
     </div>
    
  );
}

export default App;
