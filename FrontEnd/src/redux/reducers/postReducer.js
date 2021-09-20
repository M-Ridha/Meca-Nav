import { LOGOUT } from "../actions/authTypes";
import {SUCCESS, GET_POST_COUNT_SUCCESS, GET_POST_FAILED, GET_POST_REQUEST, GET_POST_SUCCESS, LOADING, UPDATE_MY_POST_FAILED, UPDATE_MY_POST_REQUEST, UPDATE_MY_POST_SUCCESS, FAILED } from "../actions/postTypes";

const initState = {
    postList:[], 
    errors:null,
    isLoading:false,
    success: false,
    count : 0 ,
    failed : false
}



const postReducer = ( state = initState , {type,payload}) => {
    switch (type) {
        
        
        case GET_POST_REQUEST : 
            return {
                ...state,
                errors :null ,
                isLoading : true
            }
        
        case GET_POST_SUCCESS :
            return {
                ...state,
                postList : payload,
                errors: false  ,
                isLoading:false              
            }
        
        case GET_POST_FAILED : 
            return {
                ...state,
                errors: payload,
                isLoading:false
            }

        case UPDATE_MY_POST_REQUEST :
            return {
                ...state,
                errors:null,
                isLoading : true
            }

        case UPDATE_MY_POST_SUCCESS :
            return {
                ...state,
                postList:state.postList.map(post=>post._id === payload._id? {...post,...payload} : post)      
                
            }    

        case UPDATE_MY_POST_FAILED : 
            return{
                ...state,
                errors: payload,
                isLoading:false
            }

        case GET_POST_COUNT_SUCCESS :
            return{
                ...state,
                count:payload.count
            }
        
        case LOADING :
            return {
                ...state,
                isLoading:payload
            }    

        case SUCCESS :
            return {
                ...state,
                success:payload
            } 
        
        case FAILED : 
            return{
                ...state,
                failed:payload
            }
        
        
        case LOGOUT :
            return{ 
                postList:[]
            }    
            
    
        default:
            return state;
    }
}


export default postReducer;