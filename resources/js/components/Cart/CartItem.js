import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    ListItemAvatar,
    ListItem,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles(theme => ({
    cartItem: {
        display: "flex"
    },
    dropOnXs: {
        [theme.breakpoints.down("xs")]: {
            top: "75%"
        }
    },
    dropped: {
        [theme.breakpoints.down("xs")]: {
            alignSelf: "flex-end"
        }
    }
}));

export default function CartItem({ product, add, remove }) {
    const classes = useStyles();

    let addToCart = () => {
        if (parseInt(product.quantity + 1) <= product.stock)
            add(product.id, product.price, 1);
    };
    return (
        <ListItem className={classes.cartItem}>
            <ListItemAvatar>
                <Avatar>
                    <img src={`/storage/${product.imageurls.split(",")[0]}`} />
                </Avatar>
            </ListItemAvatar>
            <Tooltip title={product.name}>
                <ListItemText
                    primary={`${product.name.slice(0, 22)}...`}
                    secondary={`${product.price} DZD x${product.quantity}`}
                />
            </Tooltip>
            <ListItemSecondaryAction className={classes.dropOnXs}>
                {add && (
                    <React.Fragment>
                        <IconButton
                            edge="end"
                            aria-label="add"
                            onClick={addToCart}
                            className={classes.dropped}
                        >
                            <AddIcon />
                        </IconButton>

                        {product.quantity > 1 && (
                            <IconButton
                                aria-label="remove"
                                onClick={() =>
                                    add(product.id, product.price, -1)
                                }
                                className={classes.dropped}
                            >
                                <RemoveIcon />
                            </IconButton>
                        )}
                    </React.Fragment>
                )}
                {remove && (
                    <IconButton
                        aria-label="delete"
                        onClick={() => remove(product.id)}
                        className={classes.dropped}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </ListItemSecondaryAction>
        </ListItem>
    );
}
