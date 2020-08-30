import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import AccountDetails from "./AccountDetails";
import AccountProfile from "./AccountProfile";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 5px 10px 5px"
        }
    }
}));

const Account = () => {
    const { authUser } = React.useContext(AuthenticatedUserContext);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item lg={4} md={6} xl={4} xs={12}>
                    <AccountProfile authUser={authUser} />
                </Grid>
                <Grid item lg={8} md={6} xl={8} xs={12}>
                    <AccountDetails authUser={authUser} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Account;
