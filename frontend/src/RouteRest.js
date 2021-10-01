import RestNavig  from "./RestNavig";
import {Switch,Route,useHistory} from "react-router-dom";
import RestHome from "./pages/RestHome";
import RestOrders from "./pages/RestOrders"; 
import Profile from "./pages/RestOrders";
import Dashboard from "./pages/Dashboard"
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
function RouteRest()
{
    
 
    return (<div>
        {/* <RestNavig/>
        <RestHome/> */}
        {/* <Route exact path='/' component={RestHome} /> */}
        <Route exact path="/dashboard" component={RestHome}>   
       {/*  <Route exact path='/orders' component={RestOrders}/>  */}
       </Route> 
    </div>
    );
}
export default RouteRest;   