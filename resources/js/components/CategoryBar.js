import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    makeStyles
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    link: {
        "& :active": {
            color: theme.palette.gray.main
        }
    }
}));

export default function CategoryBar({ toggleDrawer }) {
    const classes = useStyles();
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        axios
            .get("/api/categories")
            .then(res => setCategories(_.values(res.data)))
            .catch(err => console.log(err));
    }, []);

    return (
        <List
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Categories
                </ListSubheader>
            }
        >
            {categories &&
                categories.map((category, index) => (
                    <ListItem
                        button
                        key={category.id}
                        onClick={toggleDrawer("left", false)}
                    >
                        <a
                            className={classes.link}
                            href={`/categories/${category.id}/`}
                        >
                            <ListItemText
                                primary={category.name}
                                secondary={"hey"}
                            />
                        </a>
                    </ListItem>
                ))}
        </List>
    );
}
