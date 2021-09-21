import {Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavigBar from './NavigBar';
import SideDrawer from './SideDrawer';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
function RouteCustomer() {
  return (
    <div>
      
     <NavigBar />
      <Switch>
      
        <Route path="/" exact>
          {console.log("userlogin", localStorage.getItem("accessToken"))}
          {localStorage.getItem("accessToken") ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
          {localStorage.getItem("accessToken") ? <Home /> : <Login />}
        </Route>
        <Route path="/signup">
          {localStorage.getItem("accessToken") ? <Home /> : <SignUp />}
        </Route>
        <Route path="/home" component={Home} />
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
