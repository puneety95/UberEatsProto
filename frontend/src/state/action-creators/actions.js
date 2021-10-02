
export const logingetUserDetails=(details)=>{
   
    return(dispatch)=>{
        dispatch({
            type:"login_user_details",
            payload:details
        })
    }
}

export const signUpGetUserDetails=(details)=>{
        return(dispatch)=>{
            dispatch(
                {
                    type:"signup_user_details",
                    payload:details
                }
            )
        }
}