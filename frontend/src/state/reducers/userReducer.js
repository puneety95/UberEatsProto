const reducer =(state={},action) =>{
    
    switch(action.type)
    {
        case "login_user_details":
        return action.payload;

        case "signup_user_details":
        return action.payload;

        case "customer_profile_pic":
        return action.payload;
        
        default:
            return state;
    }
}
export default reducer;  