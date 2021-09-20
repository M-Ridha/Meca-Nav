import React, { useEffect,useState }  from 'react'
import {useDispatch, useSelector } from 'react-redux'
import NavBar from '../component/NavBar'
import PostList from '../component/PostList'
import { getComment } from '../redux/actions/commentActions'
import Button from '@material-ui/core/Button';
import BackToTop from '../component/BackToTop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import FilterPost from '../component/FilterPost'



const Question = () => {
    const [keyword,setKeyword]= useState("")
    
    const allPost = useSelector (state=>state.posts.postList)
    
    const user = useSelector(state => state.auth.user)  

    
    
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getComment())
    })
    
    
    const  search=(text)=>{
        setKeyword(text)
    }


    return (
        <>

            <div style={{display: 'flex' , flexDirection: 'column' , marginTop:'120px'}} >

                <NavBar ></NavBar>

                <Link to='/Profile' >
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        style={{
                            width:"200px", 
                            height:"40px",
                            marginLeft:"1250px",
                            marginTop:"-40px",
                            fontSize:"14px",
                            position: "fixed",}}>
                        <i className="fa-plus-circle"> <FontAwesomeIcon icon={ faPlusCircle} /></i> 
                        Add New Question
                    </Button>
                </Link>

                <BackToTop/>

                <FilterPost search={search}/>
                    {/* <-- filter post--> */}
                {user && allPost && <PostList posts={ allPost.filter(el=>el.category.toLowerCase().includes(keyword.toLowerCase().trim()))} />}  

            </div>

        </>

    )
}


export default Question