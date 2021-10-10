
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

export const deliveryDetails=(details)=>{
    return(dispatch)=>{
        dispatch(
            {
                type: "delivery_details",
                payload:details

            }
        )
    }
}

export const filter_details=(details)=>{
    return(dispatch)=>{

        dispatch(
            {                
                type: "filter",
                payload:details

            }
        )
    }
}

export const locationdetails=(details)=>{
    return(dispatch)=>{
        dispatch(
            {
                type: "location_details",
                payload:details

            }
        )
    }
}

