import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addNewComment} from '../redux/actions/commentActions'
import { getMyPost, getPost} from '../redux/actions/postActions'

import '../design/addComment.css'
import Button from '@material-ui/core/Button';




const  AddComment = ({post}) => {

    const dispatch = useDispatch()
    const [newComment,setNewComment] = useState ('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            text: newComment.text,
            post: post._id
        }
        dispatch(addNewComment(data));
        setNewComment ({...newComment,text:''})
        
        setTimeout(() => {
            dispatch(getMyPost())
            dispatch(getPost())
        }, 1000);

    }



    
    return (

        <form className="formcmt" onSubmit={handleSubmit}>

            <textarea 
                name='text' 
                onChange={(e)=> setNewComment({...newComment, text: e.target.value})}    
                placeholder='add comment'
                value={newComment.text || ''}
                type='text'
                required
            />

            <Button type='submit' variant="contained" style={{marginLeft:416 , marginTop:"-10px" , backgroundColor:"#26A8DA" , color:"white" , fontSize:"12px"}}> Add Comment </Button>

        </form>
    )
}

export default AddComment  
