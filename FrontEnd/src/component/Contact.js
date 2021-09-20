import React, { useState } from 'react'
import emailjs from "emailjs-com"
import "../design/contactUs.css"




const Contact = () => {

    const [email, setEmail] = useState(
        {
            FirstName:'',
            userEmail : '' ,
            message :'' ,
        }    
    )

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_xqig1ur', 'template_c0clny8', e.target, 'user_UrdxJ89NNOSM7NBEUqGa8')

            .then((result) => {
                console.log(result.text);
                alert("Your message was sent successfully! ")
            }, (error) => {
                console.log(error.text);
                alert(error.text)
        });

        setEmail({
            FirstName:'',
            userEmail:'',
            message :''
        })
    }



    return (
        
        <div className="peaperAll" > 
            
            <div className="pagecntc">
                
                <div className="msgsnd">
                    <h1>
                        QUESTIONS? <br></br>
                        COMMENTS?  <br></br> 
                        WE'D LOVE TO HEAR FROM YOU.
                        DON'T BE SHY !! <br></br>
                        JUST FILL THE FORM AND <span style={{color:"blue"}} > SEND </span>  US 
                    </h1>
                </div>
                    
                        
                <div className="containerCnt">

                    <form className="form-form-C" onSubmit={sendEmail} >
                                                    
                        <input 
                            type="text" 
                            value={email.FirstName}  
                            name="user_name" 
                            placeholder="Your name.." 
                            required 
                            onChange={(e)=>setEmail({...email,FirstName:e.target.value})}
                        />

                        <input 
                            type="email" 
                            value={email.userEmail}   
                            name="user_email" 
                            placeholder="Your email" 
                            required
                            onChange={(e)=>setEmail({...email,userEmail:e.target.value})}
                        />

                        <textarea 
                            id='1' 
                            value={email.message}   
                            name="message" 
                            placeholder="Write something.." 
                            style={{height:"200px"}}  
                            required
                            onChange={(e)=>setEmail({...email,message:e.target.value})}
                        >
                        </textarea>

                        <input type="submit" value="Send" />

                    </form>

                </div>

            </div>
    
        </div>

        

    )
}


export default Contact