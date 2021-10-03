import RouteLogin from './RouteLogin';
import {useHistory} from 'react-router-dom';

function App() {
  const history = useHistory();
  const role_value= localStorage.getItem('role');
   console.log(role_value);
   if(localStorage.getItem('accessToken'))
    {
      if(role_value==2)
      {
        history.push('/dashboard');
      }
      else{
         alert("home")
         history.push('/home');
      }
      
    } 
   else
   {
      history.push('/login');
   }
  
  return (
     <div>
       <RouteLogin/> 
   </div>
        );
}

export default App;
