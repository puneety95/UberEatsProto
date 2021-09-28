import RouteCustomer from "./RouteCustomer";
import RouteRest  from "./RouteRest";
import RouteLogin from "./RouteLogin";
import { useEffect } from "react";
import {useHistory,Route} from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
 function App() {
   const history = useHistory();
   console.log('----APP----', history);
  return (
     <div>
        {/* <Route path="/"  >
        <RestHome/>
        </Route> */}
        
        <Switch>
           <Route path="/">
           {localStorage.getItem('accessToken')?  <RouteCustomer/>  : <RouteLogin/>} 
              </Route>
        
        </Switch>
          
     </div>
    
  );
}

export default App;
