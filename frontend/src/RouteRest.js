import RestNavig  from "./RestNavig";
import {Switch,Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
function RouteRest()
{
    return (<div>
        <RestNavig/>
        <Switch>
        <Route path="/dashboard">
            <Dashboard/>
        </Route>
        <Route path="orders">
            <Orders/>
        </Route>
        
        </Switch>
  
    </div>
    );
}
export default RouteRest;