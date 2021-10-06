const reducer3 =(state={},action) =>{
    
    switch(action.type)
    {
        case "filter":
        return action.payload;

           
        default:
            return state;
    }
}
export default reducer3;  