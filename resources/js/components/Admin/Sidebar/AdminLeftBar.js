import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { NavLink } from "react-router-dom";
import CategoryBar from "../../CategoryBar";
import UsersCollapseContent from "./UsersCollapseContent";
import CommandesCollapseContent from "./CommandesCollapseContent";

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

export default function AdminLeftBar({ toggleDrawer }) {
    const classes = useStyles();
    const [productsOpen, setProductsOpen] = React.useState(false);
    const [categoriesOpen, setCategoriesOpen] = React.useState(false);
    const [usersOpen, setUsersOpen] = React.useState(false);
    const [commandesOpen, setCommandesOpen] = React.useState(false);

    const handleClickProducts = () => {
        setProductsOpen(!productsOpen);
    };

    const handleClickCategories = () => {
        setCategoriesOpen(!categoriesOpen);
    };

    const handleClickUsers = () => {
        setUsersOpen(!usersOpen);
    };

    const handleClickCommandes = () => {
        setCommandesOpen(!commandesOpen);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
            }
            className={classes.root}
        >
            <ListItem button onClick={handleClickProducts}>
                <ListItemText primary="Produits" />
                {productsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <NavLink to="/admin/products/create">
                            <ListItemText
                                primary="Ajouter Produit"
                                onClick={toggleDrawer("left", false)}
                            />
                        </NavLink>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <NavLink to="/admin/products/import">
                            <ListItemText
                                primary="Import from Excel File"
                                onClick={toggleDrawer("left", false)}
                            />
                        </NavLink>
                    </ListItem>
                </List>
            </Collapse>

            <ListItem button onClick={handleClickCategories}>
                <ListItemText primary="Categories" />
                {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
                <CategoryBar toggleDrawer={toggleDrawer} />
            </Collapse>

            <ListItem button onClick={handleClickUsers}>
                <ListItemText primary="Users" />
                {usersOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={usersOpen} timeout="auto" unmountOnExit>
                <UsersCollapseContent toggleDrawer={toggleDrawer} />
            </Collapse>

            <ListItem button onClick={handleClickCommandes}>
                <ListItemText primary="Commandes" />
                {commandesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={commandesOpen} timeout="auto" unmountOnExit>
                <CommandesCollapseContent toggleDrawer={toggleDrawer} />
            </Collapse>
        </List>
    );
}
