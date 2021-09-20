import axios from "axios";
import { prefixe } from "../../helpers/const";
import { setToken } from "../../helpers/helpers";
import { ADD_COMMENT_FAILED, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, DELETE_ADMIN_COMMENT_FAILED, DELETE_ADMIN_COMMENT_REQUEST, DELETE_ADMIN_COMMENT_SUCCESS, DELETE_COMMENT_FAILED, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, GET_COMMENT_FAILED, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS } from "./commentTypes"; 



export const addNewComment = (newComment) => async (dispatch) => {
    dispatch ({
        type : ADD_COMMENT_REQUEST
    })

    try {
        setToken()
        const {data} = await axios.post(`${prefixe}/api/post/addcomment`,newComment  ) 
        dispatch({
            type:ADD_COMMENT_SUCCESS,
            payload:data,
            
        })
    }

    catch(err) {
        dispatch ({
            type: ADD_COMMENT_FAILED,
            payload: err.response.data.errors
        })
    }
} 





export const getComment = () => async (dispatch) => {
    dispatch ({
        type : GET_COMMENT_REQUEST 
    })

    try {
        const {data} = await axios.get(`${prefixe}/api/post/getcomment`)
        dispatch ({
            type : GET_COMMENT_SUCCESS,
            payload:data
        })
    }

    catch (err) {
        dispatch ( {
            type: GET_COMMENT_FAILED,
            payload : err.response.data.errors
        })
    }
}





export const deleteMyComment = (id) => async (dispatch) => {
    dispatch({
        type : DELETE_COMMENT_REQUEST ,
    })

    try {
        setToken()
        const {data}= await axios.delete(`${prefixe}/api/post/deleteComment/${id}`)

        dispatch({
            type : DELETE_COMMENT_SUCCESS ,
            payload:data
        })
    }

    catch (err) {
        dispatch({
            type: DELETE_COMMENT_FAILED,
            payload: err.response.data.errors
        })
    }
}





export const deleteCommentAdmin = (id) => async (dispatch) => {
    dispatch({
        type: DELETE_ADMIN_COMMENT_REQUEST,
    })

    try {
        setToken()
        await axios.delete(`${prefixe}/api/post/deleteAdminComment/${id}`)

        dispatch({
            type: DELETE_ADMIN_COMMENT_SUCCESS,
        })
        dispatch(getComment())
    }

    catch (err) {
        dispatch({
            type: DELETE_ADMIN_COMMENT_FAILED,
            payload: err.response.data.errors
        })
    }

}