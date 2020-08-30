import React from "react";
import { CartContext } from "../Contexts/CartContext";
import { Box, List, Typography } from "@material-ui/core";
import OrderItem from "./OrderItem";
import { CheckoutContext } from "../Contexts/CheckoutContext";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    total: {
        alignSelf: "flex-end"
    }
}));

export default function Review() {
    const classes = useStyles();
    const { total, cart } = React.useContext(CartContext);
    const { adress } = React.useContext(CheckoutContext);
    console.log(adress);
    return (
        <Box className={classes.root} height="100%">
            <List>
                {cart.map((product, index) => (
                    <OrderItem key={index} product={product} />
                ))}
            </List>
            <Typography variant="h4" className={classes.total}>
                total: <b>{total}DA</b>
            </Typography>
            <br />
        </Box>
    );
}
