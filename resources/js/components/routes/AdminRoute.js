import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "80px 5px 10px 5px"
        }
    },
    links: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }
}));

export default function AdminRoute({ path, component: Component }) {
    const classes = useStyles();
    const [isAdmin, setIsAdmin] = React.useState(undefined);
    React.useEffect(() => {
        axios
            .post(`/api/admins`)
            .then(res => {
                setIsAdmin(true);
            })
            .catch(err => {
                setIsAdmin(false);
                window.location = "/";
            });
    });
    if (isAdmin == undefined) {
        return <h1 className={classes.root}>Loading ..</h1>;
    } else if (isAdmin == false) {
        window.location = "/";
        return <h3 className={classes.root}>401 - Unauthorized</h3>;
    } else if (isAdmin == true) {
        return <Route exact path={path} component={Component} />;
    }
}
