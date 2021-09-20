import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../design/panneCard.css' 
import { deleteSolution } from '../redux/actions/solutionActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons'



const PanneCard = ({solution}) => {
    
    const dispatch = useDispatch ()
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch (deleteSolution(solution._id))

    }
    
    const user = useSelector(state=> state.auth.user)
    
    return (
        <div className="body-crd">

            <div className="xop_banner"></div>
        
            <div className="site-container"  >
                
                <div className="deleteSolution">
                    {user && user.Role=== 'admin' &&
                        <i onClick={handleDelete} > <FontAwesomeIcon icon={ faTrashAlt} /> </i>
                    }
                </div>

                <div className="article-container">

                    <article className="article-card">
                        
                        {solution.image && <figure className="article-image">
                            <img src={solution.image.url} alt="mechanical" />
                        </figure>}

                        <div className="article-content">
                            <h2 className="card-title"> {solution.panne} </h2>
                            <div className=" card-excerpt">
                                {solution.description.map((description, index) => (
                                    <div key={index}>
                                        <h5 className="card-title" style={{fontSize:15}}>{description.cause}</h5>
                                        <p style={{fontSize:15}}>{description.remede}</p>
                                    </div> ))
                                } 
                            </div> 
                        </div>

                    </article>

                </div>

            </div> 
    
        </div>
    )
}


export default PanneCard