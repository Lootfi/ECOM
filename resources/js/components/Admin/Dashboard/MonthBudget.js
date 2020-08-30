import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyIcon from "@material-ui/icons/Money";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%"
    },
    content: {
        alignItems: "center",
        display: "flex"
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.warning.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: "flex",
        alignItems: "center"
    },
    differenceIcon: {
        color: theme.palette.primary.main
    },
    differenceValue: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1)
    }
}));

export default function MonthBudget(props) {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            BUDGET
                        </Typography>
                        <Typography variant="h3">$24,000</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <MoneyIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    <ArrowDownwardIcon className={classes.differenceIcon} />
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        12%
                    </Typography>
                    <Typography className={classes.caption} variant="caption">
                        Since last month
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}