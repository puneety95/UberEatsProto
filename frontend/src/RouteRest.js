import RestNavig  from "./RestNavig";
import {Switch,Route,useHistory} from "react-router-dom";
import RestHome from "./pages/RestHome";

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