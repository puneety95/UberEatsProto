import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavigBar from "./NavigBar";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import RestNavig  from "./RestNavig";

import RestHome from "./pages/RestHome";
import RestOrders from "./pages/RestOrders";

import Dashboard from "./pages/Dashboard"
function RouteCustomer() {
  return (
    <div>
      <NavigBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home" >
          <Home />
        </Route>
        <Route path="/login">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>
      <RestNavig/>
        <Switch>
        
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
export default RouteCustomer;
