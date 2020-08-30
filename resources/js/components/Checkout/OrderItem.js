import React from "react";
import {
    ListItemAvatar,
    ListItem,
    Avatar,
    ListItemText
} from "@material-ui/core";

export default function OrderItem({ product }) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <img src={`/storage/${product.imageurls.split(",")[0]}`} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={product.name}
                secondary={`${product.price}DA x${product.quantity}`}
            />
        </ListItem>
    );
}
