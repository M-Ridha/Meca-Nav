import React from 'react'
import { Link } from 'react-router-dom'
import '../design/firstPage.css'



const FirstPage = () => {
    
    return (
        
        <div className='bodybo' >

            <div className="header">
            
                <div className="wrapper">
            
                    <div className="logos" >
                        <div className='imgg'> <span style={{color:'white'}}>Méca</span><span style={{color:'blue'}} >Nav</span> </div>
                    </div>

                    <ul className="navi-area">
                        <li>
                            <Link to='/login' >
                                <span> sign in </span>
                            </Link>
                        </li>     

                        <li>
                            <Link to='/register' >
                                <span> sign up </span>
                            </Link>
                        </li>                            
                    </ul>
        
                </div>
                
                <div className="welcome-text">
                    <h1> IMAGINE A <br></br> 
                        <span style={{color:"blue"}}>corner </span>...
                    </h1>
                    <div className='para'>
                        WHERE YOU COULD ask questions about naval mechanics,<br></br>
                        Make with us new solution for any mechanical failure...<br></br>
                        just <Link to='/register'> <span style={{color:"blue"}}> JOINT US </span> </Link> 
                    </div>
                    
                </div>
        
            </div>

        </div>
    )
}

export default FirstPage
