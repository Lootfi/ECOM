import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, Typography, Box, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { CartContext } from "./Contexts/CartContext";
import { AuthenticatedUserContext } from "./Contexts/AuthenticatedUserContext";
import CartItem from "./Cart/CartItem";

const useStyles = makeStyles(theme => ({
    list: {
        width: 450,
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        }
    },
    fullList: {
        width: "auto"
    },
    limited: {
        overflow: "auto"
    },
    checkoutButton: {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main
    },
    clearButton: {
        borderColor: theme.palette.warning.main,
        color: theme.palette.warning.main
    },
    buttonsBox: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    close: {}
}));

export default function RightSidebar({ state, toggleDrawer }) {
    const classes = useStyles();
    const { total, cart, add, remove, clear } = React.useContext(CartContext);
    const { isLoggedIn } = React.useContext(AuthenticatedUserContext);
    const sideList = side => (
        <div className={classes.list} role="cart">
            <CloseIcon
                className={classes.close}
                onClick={toggleDrawer(side, false)}
            />
            <Box height="85vh" display="flex" flexDirection="column">
                <Box flexGrow={1} height="100%" className={classes.limited}>
                    <List>
                        {cart.map((product, index) => (
                            <CartItem
                                key={index}
                                product={product}
                                add={add}
                                remove={remove}
                            />
                        ))}
                    </List>
                </Box>
            </Box>
            <Box className={classes.buttonsBox}>
                <Typography>{total}DZD</Typography>
                <React.Fragment>
                    <Button
                        variant="outlined"
                        className={classes.clearButton}
                        onClick={() => clear()}
                        disabled={!!!cart.length}
                    >
                        Clear Cart
                    </Button>
                    <Button
                        variant="outlined"
                        className={classes.checkoutButton}
                        disabled={!!!cart.length || !isLoggedIn}
                    >
                        <Link
                            to="/checkout"
                            onClick={toggleDrawer("right", false)}
                            style={{
                                textDecoration: "inherit",
                                color: "inherit"
                            }}
                        >
                            Checkout
                        </Link>
                    </Button>
                </React.Fragment>
            </Box>
        </div>
    );

    return (
        <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer("right", false)}
        >
            {sideList("right")}
        </Drawer>
    );
}
