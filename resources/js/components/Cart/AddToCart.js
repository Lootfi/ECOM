import React from "react";
import { Typography, Button, Tooltip } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "../Contexts/CartContext";

const useStyles = makeStyles(theme => ({
    cartButtonWrapper: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "4px",
        paddingLeft: "16px",
        height: "40px",
        display: "flex",
        width: "auto"
    },
    addToCartButton: {
        boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
    },
    quantityInput: {
        width: 35,
        color: "white",
        fontSize: "18px",
        appearance: "textfield",
        border: "none",
        borderRadius: "4px 0 0 4px",
        backgroundColor: "transparent"
    },
    inputWrapper: {
        display: "flex",
        paddingRight: "8px",
        borderRight: "1px solid white"
    },
    arrowsWrapper: {
        display: "flex",
        flexDirection: "column"
    },
    arrow: {
        cursor: "pointer",
        color: "white"
    },
    tooMuchTooltip: {
        backgroundColor: "red"
    }
}));

export default function AddToCart({ product }) {
    const classes = useStyles();
    const [quantity, setQuantity] = React.useState(1);
    const [tooMuch, setTooMuch] = React.useState(false);
    const { add, alreadyIn } = React.useContext(CartContext);

    let handleArrow = qty => {
        let newQtt = quantity + qty;
        if (newQtt <= product.stock) setTooMuch(false);
        else setTooMuch(true);
        setQuantity(quantity + qty);
    };

    let handleQttChange = e => {
        let newQtt = parseInt(e.target.value);
        if (newQtt <= product.stock) setTooMuch(false);
        else setTooMuch(true);
        setQuantity(parseInt(e.target.value));
    };

    let addToStock = () => {
        if (quantity > product.stock) {
            displayTooMuch();
            return;
        }
        add(product.id, product.prices.prix_vente, quantity);
    };
    let displayTooMuch = () => {
        setTooMuch(true);
    };

    if (product.stock == 0) {
        return <h1>OUT OF STOCK!</h1>;
    }

    return (
        <React.Fragment>
            {alreadyIn(product.id) ? (
                <Button
                    variant="outlined"
                    disableRipple
                    disableFocusRipple
                    style={{
                        cursor: "auto"
                    }}
                >
                    Added to cart!
                </Button>
            ) : (
                <Tooltip
                    // className={classes.tooMuchTooltip}
                    classes={{
                        tooltip: classes.tooMuchTooltip
                    }}
                    disableHoverListener
                    disableTouchListener
                    placement="right"
                    open={tooMuch}
                    title="Too Much!"
                    arrow
                >
                    <div className={classes.cartButtonWrapper}>
                        <div className={classes.inputWrapper}>
                            <input
                                type="number"
                                name="quantity"
                                onChange={handleQttChange}
                                value={quantity}
                                className={classes.quantityInput}
                                min="1"
                                max={product.stock}
                            ></input>
                            <div className={classes.arrowsWrapper}>
                                <KeyboardArrowUpIcon
                                    fontSize="small"
                                    className={classes.arrow}
                                    onClick={() => handleArrow(1)}
                                />
                                {quantity > 1 && (
                                    <KeyboardArrowDownIcon
                                        fontSize="small"
                                        className={classes.arrow}
                                        onClick={() => handleArrow(-1)}
                                    />
                                )}
                            </div>
                        </div>
                        <Button
                            className={classes.addToCartButton}
                            variant="contained"
                            color="primary"
                            onClick={addToStock}
                        >
                            <ShoppingCartIcon />
                            Add to Cart
                        </Button>
                    </div>
                </Tooltip>
            )}
            <Typography variant="caption">In Stock: {product.stock}</Typography>
        </React.Fragment>
    );
}
