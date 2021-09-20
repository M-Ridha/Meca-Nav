import React from 'react'
import "../design/filterPost.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'




const FilterPost = ({search}) =>  {
    return (
        <div className="filterCardP">
            
            <input 
                style={{margin:10, borderRadius:15 , borderStyle:"none" ,textAlign:" center"}} 
                placeholder="search" 
                type="text" 
                onChange={(e)=>search(e.target.value) }  
            />
                
            <i className="fas fa-search"  > <FontAwesomeIcon size="3x" icon={faSearch} />  </i>
        
        </div>
    )
}

export default FilterPost