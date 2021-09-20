import { GET_COMMENT_FAILED, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS } from "../actions/commentTypes"
import { LOGOUT } from "../actions/authTypes";


const initState = {
    commentList: [],
    errors:null,
    isLoading:false,
}

const commentReducer = ( state = initState , {type,payload}) => {
    switch (type) {

        case GET_COMMENT_REQUEST : 
            return {
                ...state,
                errors :null ,
                isLoading : true
            }

        case GET_COMMENT_SUCCESS : 
            return {
                ...state,
                commentList:payload,
                errors: false  ,
                isLoading:false         
            }
            
        case GET_COMMENT_FAILED : 
            return {
                ...state,
                errors : payload,
                isLoading:false
            }
        
        case LOGOUT :
            return{ 
                commentList:[]
            }      
            
        
        default:
            return state;    
    }
}

export default commentReducer;