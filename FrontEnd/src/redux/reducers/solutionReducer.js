import { LOGOUT } from "../actions/authTypes"
import { ADD_SOLUTION_SUCCESS, FAILED, GET_SOLUTION_FAILED, GET_SOLUTION_REQUEST, GET_SOLUTION_SUCCESS, LOADING, SUCCESS } from "../actions/solutionTypes"



const initState = {
    panneList:[] ,
    errors:null,
    isLoading:false,
    success: false,
    failed : false
}


const solutionReducer = (state=initState, {type,payload}) => {
    switch (type) {
        case GET_SOLUTION_REQUEST:
            return{
                ...state,
                errors: null,
                isLoading: true
            }

        case GET_SOLUTION_SUCCESS:
            return{
                ...state,
                panneList:payload,
                errors:false,
                isLoading:false
            }
        
        case GET_SOLUTION_FAILED:
            return{
                ...state,
                errors:payload,
                isLoading:false
            }

        case ADD_SOLUTION_SUCCESS:
            return {
                ...state,
                errors:null,
                isLoading:false,
                panneList:[...state.panneList,payload]
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
                panneList:[]
            }  
            
        default:
            return state;    
    }
}



export default solutionReducer;