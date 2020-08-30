import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Badge
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core";
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

export default function CommandesCollapseContent({ toggleDrawer }) {
    const classes = useStyles();
    const [newOdersCount, setNewOrdersCount] = React.useState(0);
    const [shippedOdersCount, setShippedOrdersCount] = React.useState(0);
    React.useEffect(() => {
        axios
            .get("/api/commandes/count")
            .then(res => {
                setNewOrdersCount(parseInt(res.data.waiting));
                setShippedOrdersCount(parseInt(res.data.shipping));
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <List>
            <NavLink to="/admin/commandes/requested">
                <ListItem className={classes.nested}>
                    <ListItemText
                        primary="Nouvelles Commandes"
                        onClick={toggleDrawer("left", false)}
                    />
                    {newOdersCount > 0 && (
                        <ListItemSecondaryAction>
                            <Badge
                                badgeContent={newOdersCount}
                                color="secondary"
                            />
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
            </NavLink>
            <NavLink to="/admin/commandes/shipping">
                <ListItem className={classes.nested}>
                    <ListItemText
                        primary="Commandes Expédiées"
                        onClick={toggleDrawer("left", false)}
                    />
                    {shippedOdersCount > 0 && (
                        <ListItemSecondaryAction>
                            <Badge
                                badgeContent={shippedOdersCount}
                                color="secondary"
                            />
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
            </NavLink>
        </List>
    );
}
