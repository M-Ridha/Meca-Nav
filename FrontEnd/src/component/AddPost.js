import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost} from '../redux/actions/postActions'
import "../design/addPost.css"
import { useSelector } from 'react-redux'
import Loading from './Loading'
import "../design/msgSucc.css"
import "../design/msgFld.css"
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));



const AddPost = () => {
    
    
    const dispatch = useDispatch()
    
    const [selectedImage, setSelectedImage] = useState("")
    
    const [newPost, setNewPost] = useState(
        {
            description:'' , 
            category:''
        }    
    )

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const myImage = e.target.files[0] 
                //convert image to form data and read it 
            const reader = new FileReader()
            reader.readAsDataURL(myImage)
            reader.onloadend = () => {
                console.log(typeof reader.result)
                setSelectedImage (reader.result)
                setNewPost ({...newPost,image: reader.result})
            }
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost (newPost))
        setNewPost({...newPost,description:'',category:''})
        setSelectedImage ('')
    }
    
    const auth = useSelector(state => state.auth);
    const {isLoading, success , failed } = useSelector(state => state.posts)
    
    const classes = useStyles();


    return (
        
        <div>
            
            <div>
                {
                success !== false ? (
                <div className="msg-succ" id="alert-success">
                    <h3> {success} </h3>    
                </div>
                ) : ''
                }
            </div>

            <div>
                {
                failed !== false ? (
                <div className="msg-fld" id="alert-success">
                    <h4> {failed} </h4>    
                </div>
                ) : ''
                }
            </div>
            
            
            <div>
                <form className="write-post-container" onSubmit={handleSubmit} >
                
                    <div className="user-profile">
                        <img src="https://res.cloudinary.com/dpwmfnhfg/image/upload/v1629331900/nyvdn4dfgfgfpqlz8ali.png" alt=""/>
                        <div>
                            <p> {auth.user&&auth.user.FirstName} </p>
                        </div>
                    </div>

                    <div className="post-input-conntainer">

                        <textarea 
                            className="tadesc"
                            rows="3" 
                            placeholder="What's on your mind..."
                            name="description" 
                            onChange={(e)=>setNewPost({...newPost,description:e.target.value})} 
                            value={newPost.description} 
                            type="text"
                            required>
                        </textarea>

                        <textarea 
                            className="tacategory"
                            rows="0"  
                            placeholder="category ..."
                            name="category" 
                            onChange={(e)=>setNewPost({...newPost,category:e.target.value})} 
                            value={newPost.category} 
                            type="text"
                            required>
                        </textarea>
                    
                        <div className={classes.root}>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleImageChange} />
                            <label htmlFor="icon-button-file" style={{color: "Dodgerblue" , cursor:"pointer" }}>
                                <i className="fas fa-user-cog fa-5x"> <FontAwesomeIcon icon={ faCamera} /> </i> 
                            </label>
                        </div> 
                    
                        <img  name="preview" src = {selectedImage || null  }  alt="" />

                        <div className="add-post-links">
                            {
                            isLoading === true ? (<Loading/>) : (
                            <button type="submit" > Add Post </button>)
                            } 
                        </div>
                    
                    </div>
                
                </form>
            </div>
        
        </div>
    )
}

export default AddPost









