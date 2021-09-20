import { GET_PROFILE_FAILED, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS,LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actions/authTypes";
import { GET_MY_POST_FAILED, GET_MY_POST_REQUEST, GET_MY_POST_SUCCESS} from "../actions/postTypes";

const initState = {
    token:localStorage.getItem('token'),
    isAuth: Boolean(localStorage.getItem('isAuth')) ,         // ===> check if user authenticated or not
    user : JSON.parse(localStorage.getItem('user')),
    isLoading : false,
    errors :null,
    
}




const authReducer = (state = initState,{type,payload}) => {
    switch (type) {
        
        case LOGIN_REQUEST :
            return{ 
                ...state,
                isLoading:true
            }
            
        case LOGIN_SUCCESS :
                //localStorage : when user refresh page , this information stay stored    
            localStorage.setItem('token',payload.token)
            localStorage.setItem('isAuth','true')
            
            return{ 
                ...state,
                isLoading:false,
                isAuth:true,
                errors:null,
                token:payload.token,
                role:payload.role,
                
            }
        
        case LOGIN_FAILED :
            return{ 
                ...state,
                isLoading:false,
                isAuth:false,
                errors:payload,
                token:null
                }
        
        case GET_PROFILE_REQUEST:
            return{ 
                ...state,
                isLoading:true
            }        

        case GET_PROFILE_SUCCESS : 
            localStorage.setItem('user',JSON.stringify(payload))
            return{
                ...state,
                user:payload,
            }
        
        case GET_PROFILE_FAILED : 
            return{ 
                ...state,
                isLoading:false,
                isAuth:false,
                errors:payload,
                token:null
            }
        
        case LOGOUT :
            localStorage.clear()
            return{ 
                ...state,
                isAuth:false,
                user : null,
                token:null,
            }
            
        
        case REGISTER_REQUEST :
            return{ 
                ...state,
                isLoading : true ,
            }

        
        case REGISTER_SUCCESS : 
            localStorage.setItem('token',payload.token)
            localStorage.setItem('isAuth','true')
        
            return{ 
                ...state,
                isLoading:false,
                isAuth:true,
                errors:null,
                token:payload.token
            }

        
        case REGISTER_FAILED :
            return{ 
                ...state,
                isLoading:false,
                isAuth:false,
                errors:payload,
                token:null
                }
        
        
        case GET_MY_POST_REQUEST :
            return{ 
                ...state,
                isLoading:true
            }

            
        case GET_MY_POST_SUCCESS :
            return{ 
                ...state,
                isLoading:false,
                errors:null,
                user : {
                    ...state.user ,
                    posts : payload
                }
            }        
        

        case GET_MY_POST_FAILED :
            return{ 
                ...state,
                isLoading:false,
                errors:null,
            }


        default:
            return state
    }
}


export default authReducer