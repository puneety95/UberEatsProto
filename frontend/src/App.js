import RouteCustomer from "./RouteCustomer";
import RouteRest  from "./RouteRest";
import RouteLogin from "./RouteLogin";
import { useEffect,useState } from "react";
import {useHistory,Route} from "react-router-dom";


import {getUserDetails} from "./state/action-creators/actions.js";
 function App() {
   const history = useHistory();
   const [isLogin,setIsLogin] =useState(false);
 //  console.log("_______________REDUX___________");
 //  const state=useSelector((state)=>state.user);
 
  //console.log(state);
 
   
   if(localStorage.getItem('accessToken'))
   {
      history.push('/dashboard');
   } 
   else{
      history.push('/login');
   }
  

  return (
     <div>
       <RouteLogin/> 
      </div>
    
  );
}

export default App;
