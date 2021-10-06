import { combineReducers } from "redux";
import userReducer from "./userReducer";
import deliveryReducer from "./deliveryType";
import filterReducer from "./filter";

const reducers= combineReducers({
    user:userReducer,
    delivery:deliveryReducer,
    filter:filterReducer
});

export default reducers;