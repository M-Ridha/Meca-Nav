import React from 'react'
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '350px',
        marginTop:'-40px',
      '& > * + *': {
        marginTop: theme.spacing(2),
    },
},
}));

const LoginFeiled = () => {
    const classes = useStyles();
    const auth = useSelector (state => state.auth  )

    return (
        <div className={classes.root}>
            <Alert severity="error"> 
                <h3 style={{fontSize:"15px"}}> {auth.errors[0].msg}  </h3> 
            </Alert>
        </div>
    )
}

export default LoginFeiled
