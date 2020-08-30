import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));
export default function PlaceOrder({ handleNext, order }) {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                order();
                handleNext();
            }}
            className={classes.button}
        >
            Place order
        </Button>
    );
}
