import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfile, logout } from '../redux/actions/authActions'
import '../design/navBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClipboardCheck, faPaperPlane, faQrcode, faQuestionCircle, faSignOutAlt, faTimes, faUserCircle, faUserCog } from '@fortawesome/free-solid-svg-icons'



const NavBar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        // other code
        dispatch(getProfile())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const auth = useSelector(state => state.auth)
    



    return (

        <div className='navss' >


            <nav>
                <img style={{width:"50px" , Color:"white" , marginLeft:"1170px"}}  src='https://res.cloudinary.com/dpwmfnhfg/image/upload/v1628890529/user_vdjh12.png' alt=''/>
                <h1 style={{color:"white", fontSize:"25px" , marginLeft:"1230px" , marginTop:"-50px"}}>  {auth.user&&auth.user.FirstName} </h1>
                {user && user.Role=== "admin" && 
                    <i className="fas fa-user-cog"  style={{color:"#0758b7",  marginLeft:"1290px"  }} > (<FontAwesomeIcon icon={faUserCog}  />)  </i> 
                } 
            </nav> 


            <input type="checkbox" id="check"/>
            <label htmlFor="check">
                <i className="fas fa-bars" id="btn" > <FontAwesomeIcon icon={faBars} />  </i>
                <i className="close-btn fas fa-times" id="cancel" > <FontAwesomeIcon icon={faTimes} /> </i>
            </label>
    
            <div className="sidebar">
                
                <header>
                    <span style={{color:'white'}}>Méca</span><span style={{color:"blue"}} >Nav</span>
                </header>
            
                <ul>
                    <li> 
                        <Link to='/Home' >
                            <i className="fas fa-qrcode"> <FontAwesomeIcon icon={faQrcode} /> </i> 
                            Dashboard 
                        </Link>
                    </li>
            
                    <li> 
                        <Link to='/Profile' >
                            <i className="far fa-user-circle"> <FontAwesomeIcon icon={ faUserCircle} /></i> 
                            User 
                        </Link>
                    </li>

                    <li> 
                        <Link to='/Question' >
                            <i className="far fa-question-circle"> <FontAwesomeIcon icon={ faQuestionCircle} /> </i> 
                            Questions 
                        </Link>
                    </li>

                    <li> 
                        <Link to='/Solution' >
                            <i className="fas fa-clipboard-check"> <FontAwesomeIcon icon={ faClipboardCheck} /> </i> 
                            Solutions 
                        </Link>
                    </li>
                
                    <li> 
                        <Link to='/Contact' >
                            <i className="far fa-paper-plane"> <FontAwesomeIcon icon={ faPaperPlane} /> </i> 
                            Contact Us
                        </Link>
                    </li>

                    {/* <li> 
                    {user && user.Role=== "admin" && 
                    <Link to='/admin' >
                        <i className="fas fa-user-cog"> <FontAwesomeIcon icon={ faUserCog} />    </i> 
                        admin 
                    </Link>}
                    </li> */}

                    <li style={{cursor:'pointer'}}> 
                        <button onClick={() => dispatch(logout())} >
                            <i className="fas fa-sign-out-alt"> <FontAwesomeIcon icon={ faSignOutAlt} />  </i> 
                            Log Out
                        </button>
                    </li>
                </ul>

            </div>


        </div> 
    )
}

export default NavBar







































