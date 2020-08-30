import React from "react";
import {
    Grid,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField
} from "@material-ui/core";
import { CheckoutContext } from "../Contexts/CheckoutContext";

export default function Payment() {
    const { paymentMethod, setPaymentMethod } = React.useContext(
        CheckoutContext
    );

    let handleSelectPaymentMethod = e => {
        setPaymentMethod(e.target.value);
    };

    React.useEffect(() => {
        if (paymentMethod == "stripe") paypal.Buttons().render(".paypalButton");
    }, [paymentMethod]);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Select Payment method:</FormLabel>
                        <RadioGroup
                            name="paymethod"
                            onChange={handleSelectPaymentMethod}
                            value={paymentMethod}
                        >
                            <FormControlLabel
                                value="onDelivery"
                                control={<Radio />}
                                label="Pay on delivery"
                            />
                            <FormControlLabel
                                value="stripe"
                                control={<Radio />}
                                label="Pay with PayPal"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={5}></Grid>
                {paymentMethod == "stripe" && (
                    <Grid item container xs={6}>
                        <Grid item xs={12}>
                            <div className={"paypalButton"}></div>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
