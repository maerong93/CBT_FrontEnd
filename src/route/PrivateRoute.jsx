import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ render, component: Component, restricted, ...rest }) {
    return (
        <Route {...rest} render={props => (
            sessionStorage.getItem('loginState')
                ? (render ? (render(props)) : (<Component {...props} />))
                : <Redirect to="/" />
        )} />
    );
}

export default PrivateRoute;