import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Add from '../component/AddPanne'
import FilterPanne from '../component/FilterPanne'
import NavBar from '../component/NavBar'
import  PanneList  from '../component/PanneList'
import { getSolution } from '../redux/actions/solutionActions'









const Solution = ({solutions}) => {
    
    const dispatch = useDispatch()
    useEffect(() => {        
            dispatch(getSolution())    
    },[dispatch])

    const [keyword,setKeyword]= useState("")
    
    const solutionList = useSelector(state => state.solutions.panneList) 

    const  search=(text)=>{
        setKeyword(text)
    }
    
    
    
    
    return (
        <>
            
                <div style={{marginTop:"220px"}}>
                    <NavBar></NavBar>
                    
                    <Add/>

                    <FilterPanne search={search} />
                            {/* solution filter */}
                    {solutionList&& <PanneList  solutions={ solutionList.filter(el=>el.panne.toLowerCase().includes(keyword.toLowerCase().trim()))} />}
                
                </div>

        </>
            
    )
}


export default Solution