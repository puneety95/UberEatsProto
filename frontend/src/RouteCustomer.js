import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavigBar from "./NavigBar";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
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
    </div>
  );
}
export default RouteCustomer;
