import React from 'react'
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminPrivatRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={ (props) => 
                ( auth.isAuth && auth.role !== "admin"  ? <Redirect to="/Home" /> : <Component {...props}  /> &&  auth.isAuth=== false   ? <Redirect to="/" /> : <Component {...props} />) 
            }    
        />    
    
    );
};







export default AdminPrivatRoute 




