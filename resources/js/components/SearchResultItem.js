import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    focusedItem: {
        backgroundColor: theme.palette.primary.main
    },
    name: {
        color: "white",
        backgroundColor: fade(theme.palette.primary.main, 0.9)
    }
}));
export default function SearchResultItem({ image, name, focused, index }) {
    const classes = useStyles();
    return (
        <ListItem className={index == focused && classes.focusedItem}>
            <ListItemIcon>
                <img src={`/storage/${image}`} width="50" />
            </ListItemIcon>
            <ListItemText
                primary={name.slice(0, 22)}
                className={classes.name}
            />
        </ListItem>
    );
}
