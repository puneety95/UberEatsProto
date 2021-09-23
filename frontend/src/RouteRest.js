import RestNavig  from "./RestNavig";
import {Switch,Route} from "react-router-dom";
import RestHome from "./pages/RestHome";
import RestOrders from "./pages/RestOrders";
import Profile from "./pages/RestOrders";
import Dashboard from "./pages/Dashboard"
function RouteRest()
{
    return (<div>
        <RestNavig/>
        <Switch>
        <Route path="/" exact>
            <RestHome/>
        </Route>
        <Route path="/dashboard">
            <RestHome/>
        </Route>

        <Route path="/orders">
            <RestOrders/>
        </Route>
        <Route path="/Dashboard2">
            <Dashboard/>
        </Route>
        
        </Switch>
  
    </div>
    );
}
export default RouteRest;