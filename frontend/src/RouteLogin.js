import {Switch, Route} from "react-router-dom";
import SignUp from  './pages/SignUp';
import Login from './pages/Login';
import RestHome from "./pages/RestHome";
import RestNavig from "./RestNavig";
import RestOrders from "./pages/RestOrders"; 
import Home from "./pages/Home";
import NavigBar from "./NavigBar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import CustomerOrder from "./pages/custOrders";


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
    <Route exact path="/dash/:id" >
    <NavigBar/>
            <Dashboard /> 
    </Route>  

        
    <Route exact path="/dashboard" >
        <RestNavig/>
         <RestHome/> 
    </Route>  

    <Route exact path="/custorder" >
    <NavigBar/>
         <CustomerOrder/> 
    </Route>  

    <Route exact path="/Favorites" >
    <NavigBar/>
         <Favorites/> 
    </Route>  
    
    <Route exact path='/orders'>
    <RestNavig/>
         <RestOrders/>
    </Route>
    <Route exact path='/checkout'>
         
        <Checkout/>

    </Route>
 
    <Route exact path="/profile" >
        <NavigBar/>
         <Profile/> 
    </Route> 

    </Switch>
     </div>
    );
}
export default RouteLogin;