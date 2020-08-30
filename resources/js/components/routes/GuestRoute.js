import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";
import App from "../App";

export default function GuestRoute({ component: Component, ...rest }) {
    const { isLoggedIn } = React.useContext(AuthenticatedUserContext);
    console.log(isLoggedIn);
    if (isLoggedIn) {
        window.location = "/";
    } else
        return <Route {...rest} render={props => <Component {...props} />} />;
}
