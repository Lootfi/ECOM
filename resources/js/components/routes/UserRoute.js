import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";
import App from "../App";

export default function UserRoute({ component: Component, ...rest }) {
    const { isLoggedIn } = React.useContext(AuthenticatedUserContext);
    return (
        <Route
            {...rest}
            render={props =>
                !isLoggedIn ? <App {...props} /> : <Component {...props} />
            }
        />
    );
}
