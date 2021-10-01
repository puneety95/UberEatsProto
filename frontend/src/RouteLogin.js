import {Switch, Route} from "react-router-dom";
import SignUp from  './pages/SignUp';
import Login from './pages/Login';
import RestHome from "./pages/RestHome";
import RouteRest from "./RouteRest";
import Dashboard from "./pages/Dashboard";
import RestNavig from "./RestNavig";
import RestOrders from "./pages/RestOrders"; 



function RouteLogin()
{
    return(
    <div>
    <Switch>
    <Route path="/" exact>
            <Login/>
            </Route>
        <Route path="/login" >
            <Login/>
        </Route>
        <Route path="/signup">
            <SignUp/>
            
        </Route>   
        

        
        <Route exact path="/dashboard" >
            <RestNavig/>
        <RestHome/>
        </Route>   
         <Route exact path='/orders' component={RestOrders}/>  
         </Switch>
     </div>
    );
}
export default RouteLogin;