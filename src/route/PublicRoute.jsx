import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PublicRoute({ render, component: Component, restricted, ...rest }) {
    return (
        <Route {...rest} render={props => (
            sessionStorage.getItem('loginState') && restricted
                ? <Redirect to="/examList" /> //
                : (render ? (render(props)) : (<Component {...props} />))
        )} />
    );
}

export default PublicRoute;