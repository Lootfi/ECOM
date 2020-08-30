import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: "60px 0 0 0",
        [theme.breakpoints.down("xs")]: {
            // padding: "100px 5px 10px 5px"
            backgroundSize: "auto 100%"
        },
        display: "flex",
        background: "url('loginImage.jpg')",
        backgroundSize: "100%",
        backgroundPosition: "center",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
    login: {
        [theme.breakpoints.down("xs")]: {
            height: "90%",
            alignItems: "center",
            width: "100%"
        },
        [theme.breakpoints.down("sm")]: {
            height: "65%",
            alignItems: "center",
            width: "90%",
            borderRadius: "10px"
        },
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        background: "white",
        height: "65%",
        alignItems: "center",
        width: "40vw",
        borderRadius: "10px"
    },
    picture: {
        flex: 1,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    form: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "center"
    },
    empty: {
        flexGrow: 1
    },
    fields: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: "0 20px",
        flexGrow: 1
    },
    loginButton: {
        color: "white",
        backgroundColor: theme.palette.primary.main
    }
}));
export default function Login() {
    const authContext = useContext(AuthenticatedUserContext);
    const classes = useStyles();
    console.log(authContext.isLoggedIn);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    if (authContext.isLoggedIn) {
        window.location = "/";
        return <h3 className={classes.root}>401 - Unauthorized</h3>;
    } else {
        const { register, handleSubmit, watch, errors } = useForm();
        const onSubmit = data => {
            axios
                .post("api/login", data)
                .then(res => {
                    authContext.loginUser(res.data.user, res.data.token);
                })
                .catch(err => console.log(err))
                .then(res => {
                    window.location = "/";
                });
        };
        return (
            <Box className={classes.root}>
                <div className={classes.login}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={classes.form}
                    >
                        <Typography
                            variant="h3"
                            style={{ alignSelf: "center", padding: "10px 0" }}
                        >
                            Sign In
                        </Typography>
                        <div className={classes.fields}>
                            <TextField
                                defaultValue="lotfi@gmail.com"
                                type="email"
                                variant="outlined"
                                label="Email"
                                name="email"
                                inputRef={register({
                                    required: true,
                                    pattern: /^\S+@\S+$/i
                                })}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                defaultValue="lotfi1234"
                                name="password"
                                inputRef={register({
                                    required: true,
                                    maxLength: 250
                                })}
                            />
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<LockOpenIcon />}
                                type="submit"
                                className={classes.loginButton}
                            >
                                Login
                            </Button>
                            <Typography variant="subtitle1">
                                You don't have an account?{" "}
                                <Link to="/register">Sign Up</Link>
                            </Typography>
                        </div>
                    </form>
                    <div className={classes.empty}></div>
                </div>
            </Box>
        );
    }
}
