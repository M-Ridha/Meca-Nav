import React from 'react'
import "../design/filterPanne.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'




const FilterPanne = ({search}) =>  {
    return (
        <div className="filterCard">
            
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

export default FilterPanne
