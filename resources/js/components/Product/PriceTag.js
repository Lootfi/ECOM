import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    priceTag: {
        backgroundColor: fade(theme.palette.primary.main, 0.9),
        transform: "rotate(3deg)",
        color: theme.palette.whity.main,
        fontWeight: 600,
        padding: "5px",
        lineHeight: "1",
        fontSize: "18px",
        display: "inline-block",
        top: "-3px",
        right: "-3px",
        position: "absolute"
    }
}));

export default function PriceTag({ price }) {
    const classes = useStyles();
    return <Typography className={classes.priceTag}>{price}</Typography>;
}
