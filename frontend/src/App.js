import './App.css';
import NavigBar from './NavigBar';
import BackDrop from './BackDrop';
import SideDrawer from './SideDrawer';
import {useState} from 'react'
import Favorites from  './pages/Favorites';
import Profile from './pages/Profile';
import {Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
function App() {
 const [value_nav,setValue_nav] =useState('false');
console.log(value_nav);
const sideDrawerClickHandler=()=>{
   setValue_nav((prev_state)=>{
    
       return !prev_state;
   });
   };
 
const BackDropClickHandler=()=>{
  
  setValue_nav((prevState)=>{
    return !prevState
  });
};
let view_side_drawer;
let view_back_drop;
if(!value_nav && 1)
{ 
  view_side_drawer = <SideDrawer bd_click_handler={BackDropClickHandler}/>;
  view_back_drop=<BackDrop bd_click_handler={BackDropClickHandler}/>;
}


  return (
    <div>
       {view_side_drawer}
       {view_back_drop}
        <NavigBar sd_click_handler={sideDrawerClickHandler}/>
     <Switch>

   <Route path='/' exact>
     <Home/>

   </Route>
      <Route path='/profile'>
         <Profile/>
      </Route>
      <Route path='/favorites'>
           <Favorites/>
      </Route>
      </Switch>
       
    </div>
  );
}

export default App;
