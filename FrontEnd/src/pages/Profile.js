import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getProfile } from '../redux/actions/authActions'
import AddPost from '../component/AddPost'
import NavBar from '../component/NavBar'
import PostList from '../component/PostList'
import { getMyPost } from '../redux/actions/postActions'
import '../design/profile.css'
import { getComment } from '../redux/actions/commentActions'
import BackToTop from '../component/BackToTop'



const Profile = () => {

    const  dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfile())
        dispatch(getMyPost())
        dispatch(getComment())
    }, [dispatch])

    const user = useSelector(state => state.auth.user)  




    return (
        <div >

            <div>

                <NavBar></NavBar>

                <BackToTop/> 

                <div className="addPost" >
                    <AddPost/>
                </div>

                {user && user.posts &&<PostList posts={ user.posts}></PostList>}

            </div>

        </div>

    )
}


export default Profile