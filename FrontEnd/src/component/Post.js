import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdminPost, deleteMyPost , updateMyPost } from '../redux/actions/postActions'
import '../design/post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons'
import CommentList from './CommentList'
import AddComment from './AddComment'
import ShowMore from 'react-show-more-button/dist/module';



const Post = ({post}) => {

    const [postUpdated, setPostUpdated] = useState(post) 

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch (deleteMyPost(post._id))
    } 

    const Delete = (el) => {
        el.preventDefault()
        dispatch (deleteAdminPost(post._id))
    } 

    const user = useSelector(state => state.auth.user)


    return ( 
        
        
        <div className="post-container"  >

            <div className="user-profile">
                <img src="https://res.cloudinary.com/dpwmfnhfg/image/upload/v1629331900/nyvdn4dfgfgfpqlz8ali.png" alt=""/>
                <div>
                    <p> {`${post.owner.FirstName}`} </p>   
                    <span> {`${post.createdAt.substring(0, 10)}`} </span>
                </div>    
            </div>

            <div>
                <div className="dropdown">
                    <button className="btn">
                        <i className="fa fa-caret-down"> <FontAwesomeIcon icon={faCaretDown}/> </i>
                    </button>

                    <div className="dropdown-content">
                        
                        {user._id === post.owner._id?
                            <span type="button">
                                <p style={{fontSize:15}}> Update post : </p>
                                <div style={{display:"flex" , flexDirection:"column"}} >
                                    <textarea 
                                        style={{width:350 }}
                                        type="text" 
                                        value={postUpdated.description}
                                        onChange = {(e) => setPostUpdated({...postUpdated,description:e.target.value}) }
                                    />
                                    <button type="button" className="btn btn-primary" style={{width:"80px" , marginLeft:"270px" , color :"white" , cursor:"pointer"}} onClick={()=> dispatch(updateMyPost(postUpdated))} > Save </button>
                                </div> 
                            </span> : null 
                        } 

                        {user._id === post.owner._id  ?
                            <span type='button' style={{height:40, fontSize:15}} onClick={handleSubmit} > Delete Post </span> : null 
                        }

                        {user.Role === "admin"  ?
                            <span type='button' style={{height:40, fontSize:12}} onClick={Delete} > Delete Post (Admin) </span> : null 
                        }

                    </div>
                
                </div> 
            </div>


            <ShowMore maxHeight={175} backgroundColor="">
                <p className="post-text" >
                    {post.description}
                </p>
            </ShowMore>

            <p className="catg-text">
                {post.category}
            </p>        

            {post.image && <img 
                src= {post.image.url}
                alt=""
                className="post-img"
            />}

            <hr></hr>
            <AddComment post={post}/>
            
            {
                post.comment.map((c , i )=>(
                    <CommentList key={i} text={c.text} id={c._id}/>
                ))
            }


        </div>
    )
}

export default Post






