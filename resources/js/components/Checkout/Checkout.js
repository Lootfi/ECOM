import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    Link,
    Grid
} from "@material-ui/core";
import { CartContext } from "../Contexts/CartContext";
import { CheckoutContext } from "../Contexts/CheckoutContext";
import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";

import Shipping from "./Shipping";
import Payment from "./Payment";
import Review from "./Review";
import PlaceOrder from "./PlaceOrder";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 0 10px 0"
        }
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

function StepContent({ step }) {
    switch (step) {
        case 0:
            return <Shipping />;
        case 1:
            return <Payment />;
        case 2:
            return <Review />;
        default:
            throw new Error("Unknown step");
    }
}

export default function Checkout() {
    const classes = useStyles();
    const { isLoggedIn } = React.useContext(AuthenticatedUserContext);
    const { cart } = React.useContext(CartContext);
    const {
        step: activeStep,
        handleBack,
        handleNext,
        adress,
        paymentMethod,
        order,
        orderId
    } = React.useContext(CheckoutContext);
    if (isLoggedIn == undefined) {
        return <h3 className={classes.root}>{`Waiting for isLoggedIn`}</h3>;
    } else if (isLoggedIn == false) {
        window.location = "/login";
        return <h3 className={classes.root}>{`Login First`}</h3>;
    } else {
        if (cart.length == 0) {
            setTimeout(() => {
                window.location = "/";
            }, 1000);
            return (
                <h3 className={classes.root}>
                    {`Fill your cart and then come back ;)`}
                </h3>
            );
        }
        return (
            <div className={classes.root}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper
                            activeStep={activeStep}
                            className={classes.stepper}
                        >
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order number is #{orderId}. We will
                                        notify you an once your order has
                                        shipped.
                                    </Typography>
                                    <br />
                                    <Typography variant="subtitle1">
                                        You will be directed to your commandes
                                        page shortly ..
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <StepContent step={activeStep} />
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                        )}
                                        {activeStep == 0 && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                disabled={
                                                    !adress ? true : false
                                                }
                                            >
                                                Next
                                            </Button>
                                        )}
                                        {activeStep == 1 && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                disabled={
                                                    !paymentMethod
                                                        ? true
                                                        : false
                                                }
                                            >
                                                Next
                                            </Button>
                                        )}
                                        {activeStep == 2 && (
                                            <PlaceOrder
                                                handleNext={handleNext}
                                                order={order}
                                            />
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
            </div>
        );
    }
}
