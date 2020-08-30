import React from "react";
import PropTypes from "prop-types";
import TotalUsers from "./TotalUsers";
import MonthBudget from "./MonthBudget";
import MonthProfit from "./MonthProfit";
import { Grid, AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import MonthCommandes from "./MonthCommandes";
import { NavLink } from "react-router-dom";
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

export default function AdminHome() {
    const classes = useStyles();
    const [tab, setTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid xs={12} item>
                    <Tabs
                        value={tab}
                        onChange={handleChange}
                        aria-label="admin tabs"
                    >
                        <Tab label="Produits" />
                        <Tab label="Categories" />
                        <Tab label="Users" />
                        <Tab label="Commandes" />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <Box className={classes.links}>
                            <NavLink to="/admin/products/create">
                                Ajouter Produit
                            </NavLink>
                            <NavLink to="/admin/products">
                                Liste des Produits
                            </NavLink>
                            <NavLink to="/admin/products/import">
                                Import from Excel File
                            </NavLink>
                        </Box>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Box className={classes.links}>
                            <NavLink to="/admin/categories">
                                Manage Categories
                            </NavLink>
                        </Box>
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <Box className={classes.links}>
                            <NavLink to="/admin/clients">
                                Liste des Clients
                            </NavLink>
                        </Box>
                    </TabPanel>
                    <TabPanel value={tab} index={3}>
                        <Box className={classes.links}>
                            <NavLink to="/admin/commandes/requested">
                                Liste des Nouvelles Commandes
                            </NavLink>
                            <NavLink to="/admin/commandes/shipping">
                                Liste des Commandes en route
                            </NavLink>
                        </Box>
                    </TabPanel>
                </Grid>
                <Grid xs={12} item container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <TotalUsers />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <MonthBudget />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <MonthProfit />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <MonthCommandes />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
