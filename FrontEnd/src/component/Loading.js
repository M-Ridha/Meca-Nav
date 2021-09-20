import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loading = () => {
    return (
        
            <CircularProgress color="primary" style={{position: "fixed" , top:"0" , marginTop:"5%" , marginLeft:"25%" }} />
        
    )
}

export default Loading
