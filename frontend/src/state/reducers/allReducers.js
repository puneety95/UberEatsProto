import { combineReducers } from "redux";
import userReducer from "./userReducer";
import deliveryReducer from "./deliveryType";
import filterReducer from "./filter";
import locationReducer from "./location_reducer";

const reducers= combineReducers({
    user:userReducer,
    delivery:deliveryReducer,
    filter:filterReducer,
    location:locationReducer,
   
});

export default reducers;