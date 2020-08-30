import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    NativeSelect,
    FormControl,
    Box,
    Grid,
    Typography,
    Button
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: "60px 0 0 0",
        [theme.breakpoints.down("sm")]: {
            // padding: "100px 5px 10px 5px"
        },
        display: "flex",
        background: "url('loginImage.jpg')",
        backgroundSize: "100%",
        backgroundPosition: "center",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
    signup: {
        [theme.breakpoints.down("sm")]: {
            alignItems: "center",
            width: "50%"
        },
        [theme.breakpoints.down("xs")]: {
            alignItems: "center",
            width: "100%"
        },
        padding: "0 0 30px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        alignItems: "center",
        width: "40vw",
        borderRadius: "10px",
        textAlign: "center"
    },
    formControl: {
        margin: theme.spacing(1, 1, 1, 2),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    picture: {
        flex: 1,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    registerButton: {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up("md")]: {
            marginLeft: "10px",
            marginTop: "15px",
            width: "90%"
        },
        "&:hover": {
            color: "black"
        }
    },
    field: {
        [theme.breakpoints.up("md")]: {
            margin: theme.spacing(1, 1, 1, 2),
            width: "100%"
        },
        [theme.breakpoints.up("sm")]: {
            marginLeft: "20px",
            width: "70%"
        }
    }
}));

export default function Register() {
    const authContext = useContext(AuthenticatedUserContext);
    const classes = useStyles();
    const [wilayas, setWilayas] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const [chosenWilaya, setChosenWilaya] = React.useState("");
    const [comsOfChosenWilaya, setComsOfChosenWilaya] = React.useState("");
    const [formErrors, setFormErrors] = React.useState(undefined);
    const [errors, setErrors] = React.useState({});

    if (authContext.isLoggedIn) {
        window.location = "/";
        return <h3 className={classes.root}>401 - Unauthorized</h3>;
    } else {
        function handleChosingWilaya(e) {
            setChosenWilaya(e.target.value.split("_")[0]);
        }
        React.useEffect(() => {
            setComsOfChosenWilaya(
                communes.filter(
                    commune => commune.wilaya_id.toString() == chosenWilaya
                )
            );
        }, [chosenWilaya]);
        React.useEffect(() => {
            axios
                .get("api/wilayas")
                .then(res => setWilayas(res.data))
                .catch(err => console.log(err));
            axios
                .get("api/communes")
                .then(res => setCommunes(res.data))
                .catch(err => console.log(err));
        }, []);
        const { register, handleSubmit, watch } = useForm();
        const onSubmit = data => {
            axios
                .post("api/register", data)
                .then(res => {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                        console.log(res.data.errors);
                    } else {
                        authContext.loginUser(res.data.user, res.data.token);
                        window.location = "/";
                    }
                })
                .catch(err => console.log(err))
                .then(res => {
                    if (!errors) {
                        setFormErrors({});
                    }
                });
        };
        return (
            <Box className={classes.root}>
                <div className={classes.signup}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                            variant="h3"
                            style={{ alignSelf: "center", padding: "10px 0" }}
                        >
                            Register
                        </Typography>
                        <Grid container className={classes.formGrid}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.field}
                                    defaultValue="lotfi3"
                                    type="text"
                                    label="Username"
                                    margin="dense"
                                    variant="outlined"
                                    name="username"
                                    error={errors.username}
                                    inputRef={register({
                                        required: true,
                                        maxLength: 80
                                    })}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.field}
                                    defaultValue="lotfi3@gmail.com"
                                    type="email"
                                    variant="outlined"
                                    margin="dense"
                                    label="Email"
                                    name="email"
                                    error={errors.email}
                                    inputRef={register({
                                        required: true,
                                        pattern: /^\S+@\S+$/i
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.username && <p>{errors.username[0]}</p>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.email && <p>{errors.email[0]}</p>}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                style={{ display: "none" }}
                            >
                                <TextField
                                    className={classes.field}
                                    defaultValue="l3"
                                    type="text"
                                    margin="dense"
                                    label="Middle Name"
                                    variant="outlined"
                                    name="middleName"
                                    error={errors.middleName}
                                    inputRef={register({
                                        required: false,
                                        maxLength: 100
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.middleName && (
                                    <p>{errors.middleName[0]}</p>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.field}
                                    defaultValue="lotfi3"
                                    margin="dense"
                                    variant="outlined"
                                    type="text"
                                    label="First Name"
                                    name="firstName"
                                    error={errors.firstName}
                                    inputRef={register({
                                        required: true,
                                        maxLength: 100
                                    })}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.field}
                                    type="text"
                                    defaultValue="lotfi3"
                                    label="Last name"
                                    margin="dense"
                                    variant="outlined"
                                    name="lastName"
                                    error={errors.lastName}
                                    inputRef={register({
                                        required: true,
                                        maxLength: 100
                                    })}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                {errors.firstName && (
                                    <p>{errors.firstName[0]}</p>
                                )}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.lastName && <p>{errors.lastName[0]}</p>}
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <TextField
                                    className={classes.field}
                                    type="tel"
                                    defaultValue="0699499073"
                                    margin="dense"
                                    label="Mobile number"
                                    variant="outlined"
                                    name="phone"
                                    error={errors.phone}
                                    inputRef={register({
                                        required: true,
                                        minLength: 6,
                                        maxLength: 12
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.phone && <p>{errors.phone[0]}</p>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl className={classes.formControl}>
                                    <NativeSelect
                                        label="wilaya"
                                        margin="dense"
                                        variant="filled"
                                        id="wilaya_select"
                                        inputRef={register({ required: true })}
                                        onChange={handleChosingWilaya}
                                        name="wilaya"
                                    >
                                        <option disabled selected>
                                            Wilaya
                                        </option>
                                        {wilayas
                                            ? wilayas.map(wilaya => (
                                                  <option
                                                      key={wilaya.code}
                                                      value={
                                                          wilaya.code +
                                                          "_" +
                                                          wilaya.nom
                                                      }
                                                  >
                                                      {wilaya.code +
                                                          " " +
                                                          wilaya.nom}
                                                  </option>
                                              ))
                                            : ""}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {comsOfChosenWilaya ? (
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <NativeSelect
                                            label="commune"
                                            margin="dense"
                                            id="commune_select"
                                            inputRef={register({
                                                required: true
                                            })}
                                            name="commune"
                                        >
                                            <option disabled selected>
                                                Commune
                                            </option>
                                            {comsOfChosenWilaya.map(commune => (
                                                <option
                                                    key={commune.code_postal}
                                                    value={commune.nom}
                                                >
                                                    {commune.nom}
                                                </option>
                                            ))}
                                        </NativeSelect>
                                    </FormControl>
                                ) : (
                                    ""
                                )}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.wilaya && <p>{errors.wilaya[0]}</p>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.commune && <p>{errors.commune[0]}</p>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    className={classes.field}
                                    type="text"
                                    label="Adress"
                                    margin="dense"
                                    variant="outlined"
                                    defaultValue="lotfi3"
                                    name="address_line"
                                    error={errors.address_line}
                                    inputRef={register({
                                        required: true,
                                        maxLength: 250
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.address_line && (
                                    <p>{errors.address_line[0]}</p>
                                )}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    className={classes.field}
                                    type="password"
                                    variant="outlined"
                                    margin="dense"
                                    label="Password"
                                    defaultValue="lotfi1234"
                                    name="password"
                                    error={errors.password}
                                    inputRef={register({
                                        required: true,
                                        maxLength: 250
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.password && <p>{errors.password[0]}</p>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    className={classes.field}
                                    type="password"
                                    variant="outlined"
                                    defaultValue="lotfi1234"
                                    margin="dense"
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    error={errors.password_confirmation}
                                    inputRef={register({
                                        required: true,
                                        maxLength: 250
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {errors.password_confirmation && (
                                    <p>{errors.password_confirmation[0]}</p>
                                )}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<LockOpenIcon />}
                                    type="submit"
                                    className={classes.registerButton}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Box>
        );
    }
}
