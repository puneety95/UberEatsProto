import "./App.css";
import NavigBar from "./NavigBar";
import BackDrop from "./BackDrop";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
function App() {
  const [value_nav, setValue_nav] = useState("false");
  let userLoginBool;
  if(localStorage.getItem('accessToken'))
  {
    userLoginBool=true;
  }
  else{
    userLoginBool=false;
  }
  const [userlogin, setuserLogin] = useState(userLoginBool);
  console.log(value_nav);
  const sideDrawerClickHandler = () => {
    setValue_nav((prev_state) => {
      return !prev_state;
    });
  };

  const BackDropClickHandler = () => {
    setValue_nav((prevState) => {
      return !prevState;
    });
  };
  let view_side_drawer;
  let view_back_drop;

  if (!value_nav && 1) {
    view_side_drawer = <SideDrawer bd_click_handler={BackDropClickHandler} />;
    view_back_drop = <BackDrop bd_click_handler={BackDropClickHandler} />;
  }

  return (
    <div>
      {view_side_drawer}
      {view_back_drop}
      {userlogin && <NavigBar sd_click_handler={sideDrawerClickHandler} />}
      <Switch>
        <Route path="/" exact>
          {userlogin ? <Home /> : <Login />}
        </Route>

        <Route path="/login">{userlogin ? <Home /> : <Login />}</Route>

        <Route path="/signup">
            {userlogin ? <Home /> :<SignUp/>}
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

export default App;
