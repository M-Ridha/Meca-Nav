import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentAdmin, deleteMyComment } from '../redux/actions/commentActions'
import { getMyPost, getPost } from '../redux/actions/postActions'
import '../design/commentList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTrashAlt, faUserTimes } from '@fortawesome/free-solid-svg-icons'



const CommentList = ({text,id}) => {

    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch (deleteMyComment(id))
        setTimeout(() => {
            if(!window.location.href.includes('Profile')){
                dispatch (getPost())
            }else{
                dispatch (getMyPost())
            }
        }, 0);
    }

    const Delete = (el) => {
        el.preventDefault()
        dispatch (deleteCommentAdmin(id))
        setTimeout(() => {
            if(!window.location.href.includes('Profile')){
                dispatch (getPost())
            }else{
                dispatch (getMyPost())
            }
        }, 0);
    } 
    
    
    const user = useSelector(state => state.auth.user)
    const auth = useSelector(state => state.auth)


    return (
        <div className="cmntcnt">
            
            
            <div style={{display:"flex" ,  alignItems:"center"}}>
                
                <div style={{display:'flex' , alignItems:"center" }}>
                    <img style={{width:"40px" , marginTop:5 , marginLeft:5}}  src='https://res.cloudinary.com/dpwmfnhfg/image/upload/v1628890529/user_vdjh12.png' alt=''/>
                    <h1 style={{marginLeft:"5px"}}> {auth.user&&auth.user.FirstName} </h1>
                </div>
                

                <label className="dropdowncmt">

                    <div style={{marginTop:-0 , marginLeft:"20px" , cursor:"pointer"}}>
                        <i className="fas fa-ellipsis-h fa-2x"><FontAwesomeIcon icon={faEllipsisH}/></i>
                    </div>
                    
                    <input type="checkbox" className="dd-input" id="test"/>

                    <ul className="dd-menu">

                        <li onClick={handleSubmit}> <FontAwesomeIcon icon={ faTrashAlt} /> delete</li>
                        {user.Role === "admin"  ?
                            <li onClick={Delete}> <FontAwesomeIcon icon={faUserTimes}/> delete admin </li>
                        : null }
                    
                    </ul>

                </label>


            </div>
            
        
            <p className="cmnt-text">{text}</p>

        </div>
    )
}


export default CommentList 