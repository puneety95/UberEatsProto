import RouteCustomer from "./RouteCustomer";
import RouteRest  from "./RouteRest";
import RouteLogin from "./RouteLogin";
import { useEffect,useState } from "react";
import {useHistory,Route} from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import RestHome from "./pages/RestHome";
import RestOrders from "./pages/RestOrders";

 function App() {
   const history = useHistory();
   const [isLogin,setIsLogin] =useState(false);
  
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
