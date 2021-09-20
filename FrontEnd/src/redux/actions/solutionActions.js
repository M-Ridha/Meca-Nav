import axios from "axios";
import {prefixe} from "../../helpers/const" 
import { setToken } from "../../helpers/helpers";
import { LOADING } from "./postTypes";
import { ADD_SOLUTION_FAILED, ADD_SOLUTION_REQUEST, ADD_SOLUTION_SUCCESS, DELETE_SOLUTION_FAILED, DELETE_SOLUTION_REQUEST, DELETE_SOLUTION_SUCCESS, FAILED, GET_SOLUTION_FAILED, GET_SOLUTION_REQUEST, GET_SOLUTION_SUCCESS, SUCCESS } from "./solutionTypes";





    //add new Solution
export const addNewSolution = (newSolution) => async (dispatch) => {
    
    dispatch({
        type : ADD_SOLUTION_REQUEST
    })
    dispatch({
        type: LOADING,
        payload: true
    })

    try {
        setToken()
        const{data} = await axios.post(`${prefixe}/api/solution/addSolution`,newSolution)
        
        dispatch({
            type:ADD_SOLUTION_SUCCESS,
            payload:data
        })

        dispatch({
            type: LOADING,
            payload: false
        })

        setTimeout(() => {
            dispatch({
                type: SUCCESS,
                payload: 'Solution added with success'
            })
        }, 1000)
        dispatch(getSolution())
            setTimeout(() => {
                dispatch({
                    type: SUCCESS,
                    payload: false
                })
            }, 4000) 
    }

    catch (err) {
        dispatch ({
            type: ADD_SOLUTION_FAILED,
            payload : err.response.data.errors
        })
        dispatch({
            type: LOADING,
            payload: false
        })

        setTimeout(() => {
            dispatch({
                type: FAILED ,
                payload: "please fill in all fields !! "
            })
        }, 500)
        
        setTimeout(() => {
            dispatch({
                type: FAILED,
                payload: false
            })
        }, 5000) 
    }
}     





    //get solution card
export const getSolution = () => async (dispatch) => {
    dispatch({
        type:GET_SOLUTION_REQUEST
    })

    try{
        setToken()
        const {data} = await axios.get(`${prefixe}/api/solution/getSolution`)
        dispatch({
            type: GET_SOLUTION_SUCCESS,
            payload:data
        })
    }

    catch(err) {
        dispatch ({
            type : GET_SOLUTION_FAILED,
            payload : err.response.data.errors
        })    
    } 
}





    //delete solution card
export const deleteSolution = (id) => async (dispatch) => {
    dispatch({
        type : DELETE_SOLUTION_REQUEST
    })

    try {
        setToken()
        await axios.delete(`${prefixe}/api/solution/deleteSolution/${id}`)
        dispatch ({
            type : DELETE_SOLUTION_SUCCESS
        })
        setTimeout(() => {
            dispatch({
                type: SUCCESS,
                payload: ' Solution deleted with success'
            })
        }, 500)
        dispatch (getSolution())
        
        setTimeout(() => {
            dispatch({
                type: SUCCESS,
                payload: false
            })
        }, 4000)
    }

    catch(err) {
        dispatch ({
            type : DELETE_SOLUTION_FAILED,
            payload : err.response.data.errors
        })
    }
}