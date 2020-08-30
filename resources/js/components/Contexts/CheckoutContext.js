import React from "react";
import { CartContext } from "./CartContext";

import { AuthenticatedUserContext } from "./AuthenticatedUserContext";
export const CheckoutContext = React.createContext();

export default function CheckoutContextProvider(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [adress, setAdress] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("");
    const [orderId, setOrderId] = React.useState(null);
    const { cart, emptyCart } = React.useContext(CartContext);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const order = () => {
        axios
            .post("/api/order", { cart, adress, paymentMethod })
            .then(res => {
                setOrderId(parseInt(res.data));
                setTimeout(() => {
                    emptyCart();
                    window.location = "/client/commandes";
                }, 3000);
            })
            .catch(err => console.log(err));
    };

    return (
        <CheckoutContext.Provider
            value={{
                step: activeStep,
                handleNext,
                handleBack,
                adress,
                setAdress,
                paymentMethod,
                setPaymentMethod,
                order,
                orderId
            }}
        >
            {props.children}
        </CheckoutContext.Provider>
    );
}
