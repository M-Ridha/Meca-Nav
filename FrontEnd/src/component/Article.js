import React, { useState } from 'react'
import { article } from '../data/articleData'
import '../design/article.css'






const Article = () => {


    useState(article)


    return (
        <div className="html">
            
            <div className ='Body'> 
                
                {article.map((el,i) =>     
                    <div key={i} className="blog-post">

                        <div className="blog-post_img">
                            <img src={el.image} alt=""/>
                        </div>

                        <div className="blog-post_info">
                            <h1 className="blog-post_title" > {el.title} </h1>
                            <p className ="blog-post_text" > 
                                {el.description}
                            </p>
                            <a href={el.url} className="blog-post_cta" > See more </a>
                        </div>
    
                    </div>         
                )}
            
            </div>
        
        </div>
    )
}

export default Article 