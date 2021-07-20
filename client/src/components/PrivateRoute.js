import React from 'react';
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = (props) => {
    return <Route {...props} render={()=> {
        return "This is some route"
    }}/>
}

export default PrivateRoute;