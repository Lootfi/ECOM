import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    content: {
        alignItems: "center",
        display: "flex"
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.white,
        color: theme.palette.primary.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    }
}));

export default function MonthCommandes(props) {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="inherit"
                            gutterBottom
                            variant="body2"
                        >
                            TOTAL COMMANDES
                        </Typography>
                        <Typography color="inherit" variant="h3">
                            31
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <LocalShippingIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}