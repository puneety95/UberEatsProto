const reducer4 =(state={},action) =>{
    console.log("----------------action-------------",action);
    switch(action.type)
    {
        case "location_details":
        return action.payload;

           
        default:
            return state;
    }
}
export default reducer4;  