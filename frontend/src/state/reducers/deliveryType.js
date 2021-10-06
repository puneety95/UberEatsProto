const reducer2 =(state={},action) =>{
    
    switch(action.type)
    {
        case "delivery_details":
        return action.payload;

           
        default:
            return state;
    }
}
export default reducer2;  