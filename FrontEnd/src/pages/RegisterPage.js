import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { register } from '../redux/actions/authActions'




const  RegisterPage = () => {
    

    const [info,setInfo] = useState ( { 
        FirstName:"", 
        LastName : "" ,
        email : "" ,
        Password : "" 
    })
    
    const dispatch = useDispatch ()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(info) )
    }
    
    const auth = useSelector (state => state.auth  )
    const history = useHistory()
    useEffect(() => {
        if (auth.isAuth)
            history.push('/Home')
    }, [history,auth.isAuth])
    

    return ( 
        

        <div className="body-log">

            <div className="wrapperL" onSubmit={handleSubmit}>
        
                <div className="title-text">
                    <div className="title signup">
                        joint US
                    </div>
                </div>
        
                <div className="form-container">
            
                    <div className="form-inner">
                
                        <form action="#" className="signup">

                            <div className="field">
                                <input type="FirstName" placeholder="First Name" onChange={(e)=> setInfo ({...info,FirstName:e.target.value})} required/>
                            </div>

                            <div className="field">
                                <input type="LastName" placeholder="Last Name" onChange={(e)=> setInfo ({...info,LastName:e.target.value})}  required/>
                            </div>
                    
                            <div className="field">
                                <input type="email" placeholder="account@domain.ext" onChange={(e)=> setInfo ({...info,email:e.target.value})} required/>
                            </div>
                    
                            <div className="field">
                                <input type="password" placeholder="password" onChange={(e)=> setInfo ({...info,Password:e.target.value})}  required/>
                            </div>
                    
                    
                    
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Signup"/>
                            </div>
                
                            <div className="signup-link" style={{fontSize:15}}>
                                Already have an account ?
                                <Link to= '/login' >
                                    <label type="reset" >Login now</label>
                                </Link>
                            </div>
                

                        </form>
            
                    </div>
        
                </div>
    
            </div>


        </div>

    )
}

export default RegisterPage
