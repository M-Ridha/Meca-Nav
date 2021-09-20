import axios from "axios";
import { prefixe } from "../../helpers/const";
import { setToken } from "../../helpers/helpers";
import { SUCCESS, LOADING, ADD_POST_FAILED,ADD_POST_SUCCESS, DELETE_MY_POST_FAILED, DELETE_MY_POST_REQUEST, DELETE_MY_POST_SUCCESS, GET_MY_POST_FAILED, GET_MY_POST_REQUEST, GET_MY_POST_SUCCESS, GET_POST_COUNT_FAILED, GET_POST_COUNT_REQUEST, GET_POST_COUNT_SUCCESS, GET_POST_FAILED, GET_POST_REQUEST, GET_POST_SUCCESS, UPDATE_MY_POST_FAILED, UPDATE_MY_POST_REQUEST, UPDATE_MY_POST_SUCCESS, FAILED, DELETE_ADMIN_POST_REQUEST, DELETE_ADMIN_POST_SUCCESS, DELETE_ADMIN_POST_FAILED } from "./postTypes";



    //Add new post 
export const addPost = (newPost) => async (dispatch) => {

    await axios.post(`${prefixe}/api/post/addpost`, newPost)
        .then(data => {
            dispatch({
                type: LOADING,
                payload: true
            })
            dispatch({
                type: ADD_POST_SUCCESS,
                payload: data
            })
            setTimeout(() => {
                dispatch({
                    type: SUCCESS,
                    payload: 'Post added with success'
                })
            }, 1000)
            dispatch(getMyPost())
            dispatch(getPost())
            setTimeout(() => {
                dispatch({
                    type: SUCCESS,
                    payload: false
                })
            }, 4000) 
        })
        
        .catch(err => {
            dispatch({
                type: ADD_POST_FAILED,
                payload: err.response.data.errors
            })
            setTimeout(() => {
                dispatch({
                    type: FAILED ,
                    payload: "you can't add post without description !!  "
                })
            }, 1000)
            dispatch(getMyPost())
            dispatch(getPost())
            setTimeout(() => {
                dispatch({
                    type: FAILED,
                    payload: false
                })
            }, 5000) 
        })

}





    //get post 
export const getPost = () => async (dispatch) => {
    dispatch({
        type: GET_POST_REQUEST
    })
    try {
        setToken()
        const { data } = await axios.get(`${prefixe}/api/post/posts`)
        dispatch({
            type: GET_POST_SUCCESS,
            payload: data
        })
    }

    catch (err) {
        dispatch({
            type: GET_POST_FAILED,
            payload: err?.response?.data?.errors
        })

    }
}





    //get user's post
export const getMyPost = () => async (dispatch) => {
    dispatch({
        type: GET_MY_POST_REQUEST,
    })

    try {
        setToken()
        const { data } = await axios.get(`${prefixe}/api/post/myposts`)

        dispatch({
            type: GET_MY_POST_SUCCESS,
            payload: data
        })

        dispatch({
            type: SUCCESS,
            payload: false
        })

        dispatch({
            type: FAILED,
            payload: false
        }) 
    }

    catch (err) {
        dispatch({
            type: GET_MY_POST_FAILED,
            payload: err.response.data.errors
        })
    }
}





    //DELETE POST 
export const deleteMyPost = (id) => async (dispatch) => {
    dispatch({
        type: DELETE_MY_POST_REQUEST,
    })

    try {
        setToken()
        await axios.delete(`${prefixe}/api/post/deletepost/${id}`)

        dispatch({
            type: DELETE_MY_POST_SUCCESS,
        })
        
        setTimeout(() => {
            dispatch({
                type: SUCCESS,
                payload: 'Post deleted with success'
            })
        }, 500)
        dispatch(getMyPost())
        dispatch(getPost())
        setTimeout(() => {
            dispatch({
                type: SUCCESS,
                payload: false
            })
        }, 4000)
    }

    catch (err) {
        dispatch({
            type: DELETE_MY_POST_FAILED,
            payload: err.response.data.errors
        })
    }

}




    //delete as admin
export const deleteAdminPost = (id) => async (dispatch) => {
    dispatch({
        type: DELETE_ADMIN_POST_REQUEST,
    })

    try {
        setToken()
        await axios.delete(`${prefixe}/api/post/deleteAdminpost/${id}`)

        dispatch({
            type: DELETE_ADMIN_POST_SUCCESS,
        })
        dispatch(getPost())
    }

    catch (err) {
        dispatch({
            type: DELETE_ADMIN_POST_FAILED ,
            payload: err.response.data.errors
        })
    }
}





    //Update user's post
export const updateMyPost = (postUpdated) => async (dispatch) => {
    dispatch({
        type: UPDATE_MY_POST_REQUEST,
    })

    try {
        setToken()
        const newData = await axios.put(`${prefixe}/api/post/updatepost/${postUpdated._id}`, postUpdated)

        dispatch({
            type: UPDATE_MY_POST_SUCCESS,
            payload: newData
        })
        setTimeout(() => {
            dispatch({
                type: SUCCESS,
                payload: 'Post updated with success'
            })
        }, 500)
        dispatch(getMyPost())
        dispatch(getPost())
        setTimeout(() => {
            dispatch({
                type: SUCCESS,
                payload: false
            })
        }, 4000)
    }

    catch (err) {
        dispatch({
            type: UPDATE_MY_POST_FAILED,
            payload: err.response.data.errors
        })
    }
}





    //PostCount
export const getPostCount = () => async (dispatch) => {
    dispatch({
        type: GET_POST_COUNT_REQUEST
    })

    try {
        const { data } = await axios.get(`${prefixe}/api/post/postcount`)
        dispatch({
            type: GET_POST_COUNT_SUCCESS,
            payload: data
        })
        dispatch(getMyPost())
        dispatch(getPost())
    }

    catch (err) {
        dispatch({
            type: GET_POST_COUNT_FAILED,
            payload: err.response.data.errors
        })
    }
}