import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

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
        backgroundColor: "#666",
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: "10px",
        display: "flex",
        alignItems: "center"
    },
    differenceIcon: {
        color: "#666"
    },
    differenceValue: {
        color: "#666",
        marginRight: "5px"
    }
}));

const TotalUsers = props => {
    const { className, ...rest } = props;
    const classes = useStyles();
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        axios
            .get("/api/clients")
            .then(res => setTotal(res.data.length))
            .catch(err => console.log(err));
    }, []);

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
                            TOTAL CLIENTS
                        </Typography>
                        <Typography variant="h3">{total}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PeopleIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    <ArrowUpwardIcon className={classes.differenceIcon} />
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        16%
                    </Typography>
                    <Typography className={classes.caption} variant="caption">
                        Since last month
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

TotalUsers.propTypes = {
    className: PropTypes.string
};

export default TotalUsers;
