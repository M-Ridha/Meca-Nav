import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {login} from '../redux/actions/authActions'
import '../design/LoginRegister.css'
import LoginFeiled from '../component/LoginFeiled'






const LoginPage = () => {

    const [info,setInfo] = useState({ 
        email:"",
        Password:"",
    })
    
    const auth = useSelector (state => state.auth  )


    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch (login (info))
    }
        //if auth=true so (RegisterPage)=>(UserProfile)... (we use 'history').
    const history = useHistory()
    useEffect(() => {
        if (auth.isAuth && auth.role === "user" )
            history.push('/Home')
        else if (auth.isAuth && auth.role=== "admin") {
                history.push('/Home')
            }
    }, [history,auth.isAuth,auth.role])
    
    

    return (
        
        <div className='body-log'>

            {
                auth.errors && auth.errors.length > 0 ? <LoginFeiled/> : ''
            }

            <div className="wrapperL" onSubmit={handleSubmit}>
            
                <div className="title-text">
                    <div className="title login">
                        Login 
                    </div>
                </div>

                <div className="form-container">    
                    <div className="form-inner">
                        <form action="#" className="login">
                            
                            <div className="field">
                                <input  type="email" placeholder="Email Address" onChange={(e)=> setInfo ({...info,email:e.target.value})} required />
                            </div>
                            
                            <div className="field">
                                <input type="password" placeholder="password" onChange={(e)=> setInfo ({...info,Password:e.target.value})} required />
                            </div>
                        
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Login" />
                            </div>

                            <div className="signup-link" style={{fontSize:15}}>
                                Not a member?  
                                <Link to= '/register' > 
                                    <label type="reset" > Sign Up now </label> 
                                </Link>
                            </div>
                        
                        </form>
                    </div>
                </div>

            </div>


        </div>

    )
}

export default LoginPage
