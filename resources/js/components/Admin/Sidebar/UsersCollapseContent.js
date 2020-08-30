import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

export default function UsersCollapseContent({ toggleDrawer }) {
    const classes = useStyles();

    return (
        <List>
            <ListItem className={classes.nested}>
                <NavLink to="/admin/clients">
                    <ListItemText
                        primary="All Clients"
                        onClick={toggleDrawer("left", false)}
                    />
                </NavLink>
            </ListItem>
        </List>
    );
}
