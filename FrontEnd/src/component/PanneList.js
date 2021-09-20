import React from 'react'
import PanneCard from './PanneCard'
import '../design/panneList.css'


const PanneList = ({solutions}) => {
    return(
        <div className="list">
            {solutions&&solutions.map((solution,i) => <PanneCard key={i} solution={solution}></PanneCard>)}
        </div>
    )
}

export default PanneList