import React from "react";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    ListItemText,
    Button,
    FormControl
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import AddressForm from "./AddressForm";
import { CheckoutContext } from "../Contexts/CheckoutContext";

export default function Shipping() {
    const [addingAdr, setAddingAdr] = React.useState(false);
    const [addresses, setAddresses] = React.useState([]);
    const { adress, setAdress } = React.useContext(CheckoutContext);
    // const [value, setValue] = React.useState("");

    React.useEffect(() => {
        axios
            .get("/api/clients/addresses")
            .then(res => setAddresses(res.data))
            .catch(err => console.log(err));
    }, []);
    let handleChange = e => {
        setAdress(parseInt(e.target.value));
        // setValue(parseInt(e.target.value));
    };
    let handleAddingAddress = () => {
        setAddingAdr(!addingAdr);
    };

    return (
        <React.Fragment>
            {addresses.length && (
                <RadioGroup
                    aria-label="shippement Address"
                    name="shippementAdr"
                    onChange={handleChange}
                    value={adress}
                >
                    {addresses.map((adr, index) => (
                        <FormControlLabel
                            control={<Radio />}
                            value={adr.id}
                            label={
                                <ListItemText
                                    primary={
                                        adr.address_line + " " + adr.commune
                                    }
                                    secondary={adr.wilaya.split("_")[1]}
                                />
                            }
                            key={index}
                        />
                    ))}
                </RadioGroup>
            )}
            <Button
                variant="outlined"
                startIcon={addingAdr ? <RemoveIcon /> : <AddIcon />}
                onClick={handleAddingAddress}
            >
                new address
            </Button>
            {addingAdr && (
                <AddressForm
                    setAddresses={setAddresses}
                    setAddingAdr={setAddingAdr}
                />
            )}
        </React.Fragment>
    );
}
