import React from "react";
import { useForm } from "react-hook-form";

import {
    Grid,
    TextField,
    Checkbox,
    FormControl,
    NativeSelect,
    Select,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Button
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

import { AuthenticatedUserContext } from "../Contexts/AuthenticatedUserContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    editButton: {
        border: "2px solid",
        borderColor: fade(theme.palette.primary.main, 0.8),
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        width: "100px"
    }
}));

export default function AddressForm({ setAddresses, setAddingAdr }) {
    const { authUser } = React.useContext(AuthenticatedUserContext);
    const classes = useStyles();
    const [wilayas, setWilayas] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const [chosenWilaya, setChosenWilaya] = React.useState("");
    const [chosenCommune, setChosenCommune] = React.useState("");
    const [adrLine, setAdrLine] = React.useState("");
    const [comsOfChosenWilaya, setComsOfChosenWilaya] = React.useState("");
    // const { register, handleSubmit, watch, errors } = useForm();
    const handleSubmit = e => {
        e.preventDefault();
        let fd = new FormData();
        fd.append("wilaya", chosenWilaya);
        fd.append("commune", chosenCommune);
        fd.append("address_line", adrLine);
        axios
            .post(`/api/clients/${authUser.id}/add-address`, fd)
            .then(res => {
                setAddresses(res.data.addresses);
                setAddingAdr(false);
            })
            .catch(err => console.log(err));
    };
    function handleChosingWilaya(e) {
        setChosenWilaya(e.target.value);
    }

    function handleChosingCommune(e) {
        setChosenCommune(e.target.value);
    }
    function handleAdrLine(e) {
        setAdrLine(e.target.value);
    }
    React.useEffect(() => {
        setComsOfChosenWilaya(
            communes.filter(
                commune =>
                    commune.wilaya_id.toString() == chosenWilaya.split("_")[0]
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

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControl className={classes.formControl} required>
                        <InputLabel>Wilaya</InputLabel>
                        <Select
                            label="wilaya"
                            id="wilaya_select"
                            onChange={handleChosingWilaya}
                            name="wilaya"
                        >
                            {wilayas
                                ? wilayas.map(wilaya => (
                                      <MenuItem
                                          key={wilaya.code}
                                          value={wilaya.code + "_" + wilaya.nom}
                                      >
                                          {wilaya.code + " " + wilaya.nom}
                                      </MenuItem>
                                  ))
                                : ""}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    {comsOfChosenWilaya ? (
                        <FormControl className={classes.formControl} required>
                            <InputLabel>Commune</InputLabel>
                            <Select
                                label="commune"
                                id="commune_select"
                                name="commune"
                                onChange={handleChosingCommune}
                            >
                                {comsOfChosenWilaya.map(commune => (
                                    <MenuItem
                                        key={commune.code_postal}
                                        value={commune.nom}
                                    >
                                        {commune.nom}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        ""
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address_line"
                        name="address_line"
                        label="Adress Line"
                        fullWidth
                        onChange={handleAdrLine}
                        value={adrLine}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        className={classes.editButton}
                        size="large"
                        startIcon={<EditIcon />}
                        type="submit"
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
