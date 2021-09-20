import { GET_PROFILE_FAILED, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS} from "./authTypes" 
import axios from "axios"
import { prefixe } from "../../helpers/const"
import { setToken } from "../../helpers/helpers"
import { getMyPost, getPost, getPostCount} from "./postActions"



            //syntaxe for fnct Asynchrone
export const login = (info)=>async(dispatch) => {
    
    dispatch({type: LOGIN_REQUEST}) 
    
    try{
        const res = await axios.post(`${prefixe}/api/user/login`, info)
        dispatch ({ 
            type :LOGIN_SUCCESS,
            payload: res.data
        })
    }
    catch(err){
        dispatch ({ 
            type : LOGIN_FAILED,
            payload: err.response.data.errors
        })
    }

}



export const getProfile =()=> async (dispatch) => {
    dispatch({type: GET_PROFILE_REQUEST})
    try {
        setToken()
        const {data} = await axios.get (`${prefixe}/api/user/getProfile`)
        dispatch ({ 
            type : GET_PROFILE_SUCCESS,
            payload: data
        })
        dispatch (getPostCount())
        dispatch ( getMyPost())
        dispatch (getPost())
    
    }

    catch(err){
        dispatch ({ 
            type : GET_PROFILE_FAILED,
            payload: err.response.data.errors
        })
    }

}



export const logout =() => {
    return {
        type : LOGOUT
    }
}




export const register =(info) => async (dispatch) => {
    dispatch ({type: REGISTER_REQUEST})
    try {
        const res = await axios.post(`${prefixe}/api/user/register`,info )
        dispatch ({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch (getProfile())
    }
    
    catch(err) {
        dispatch ({
            type : REGISTER_FAILED,
            payload: err.response.data.errors
        })   
    }
}


