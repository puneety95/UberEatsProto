import {Switch, Route} from "react-router-dom";
import SignUp from  './pages/SignUp';
import Login from './pages/Login';

function RouteLogin()
{
    return(
    <div>
        <Switch>
        
        <Route path="/login" >
            <Login/>
        </Route>
        <Route path="/signup">
            <SignUp/>
        </Route>
        <Route path="/" >
            <Login/>
        </Route>
        </Switch>
     </div>
    );
}
export default RouteLogin;