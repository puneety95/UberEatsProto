import {Switch, Route} from "react-router-dom";
import SignUp from  './pages/SignUp';
import Login from './pages/Login';
import RestHome from "./pages/RestHome";
import RestNavig from "./RestNavig";
import RestOrders from "./pages/RestOrders"; 
import Home from "./pages/Home";
import NavigBar from "./NavigBar";
import Dashboard from "./pages/Dashboard";


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
        <Route path="/home" >
            <NavigBar/>
          <Home />
        </Route>
   <Route path="/dash" component={Dashboard}/>

        
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