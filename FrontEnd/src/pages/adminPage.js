import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackToTop from '../component/BackToTop'
import NavBar from '../component/NavBar'
import { /* getPost, */ getPostCount } from '../redux/actions/postActions'





const Admin = () => {
    
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch (getPostCount())
    },[dispatch])
    
    
    const count = useSelector(state => state.posts.postList.length)
        
    
    

    return (
        <>
            
                <div>
                    
                    <NavBar></NavBar>

                    <BackToTop/>

                    <h1
                        style={{marginTop:"100px"}}
                    > 
                        HEDHA l Admin 
                        
                    </h1> <br></br>

                    <h1>{count}</h1>


                </div>
                
        </>
            
    )
}


export default Admin