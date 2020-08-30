import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Grid,
    Typography,
    Box,
    TextField,
    Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
    root: {},
    promoItem: {
        border: "2px solid",
        borderColor: fade(theme.palette.primary.main, 0.8),
        borderRadius: "5px"
    },
    addForm: {
        display: "flex",
        alignItems: "center"
    },
    addButton: {
        border: "2px solid",
        borderColor: fade(theme.palette.primary.main, 0.8),
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        width: "100px"
    },
    deleteButton: {
        color: theme.palette.warning.main
    }
}));

export default function PromoCode({ promoCodes, productId }) {
    const classes = useStyles();
    const [codes, setCodes] = React.useState(promoCodes ? promoCodes : null);
    const [newCode, setNewCode] = React.useState();
    let deleteCode = (id, index) => {
        axios
            .post(`/api/promos/${id}/destroy`)
            .then(res => {
                let codesCopy = codes.slice();
                codesCopy.splice(index, 1);
                setCodes(codesCopy);
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    let handleSubmit = e => {
        e.preventDefault();
        let fd = new FormData();
        fd.append("code", newCode);
        fd.append("productId", productId);
        axios
            .post("/api/promos/store", fd)
            .then(res => {
                console.log(res);
                setCodes([...codes, res.data]);
                setNewCode("");
            })
            .catch(err => console.log(err));
    };
    let handleChange = e => {
        let code = e.target.value;
        if (code.length > 10) {
            alert("Promo codes cannot be longer than 10 characters");
            return;
        }
        setNewCode(code);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <h3>Promo Codes</h3>
                <h6>MAX: 3</h6>
            </Grid>
            <Grid item xs={12}>
                <List>
                    <Grid container spacing={2}>
                        {codes &&
                            codes.map((code, index) => (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <ListItem
                                        button
                                        className={classes.promoItem}
                                    >
                                        <ListItemText primary={code.code} />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                onClick={() =>
                                                    deleteCode(code.id, index)
                                                }
                                            >
                                                <DeleteIcon
                                                    className={
                                                        classes.deleteButton
                                                    }
                                                />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Grid>
                            ))}
                    </Grid>
                </List>
            </Grid>
            <Grid item xs={12} sm={8} md={7}>
                <form onSubmit={handleSubmit} className={classes.addForm}>
                    <TextField
                        variant="outlined"
                        label="Promo Code"
                        name="promoCode"
                        onChange={handleChange}
                        value={newCode}
                        disabled={codes.length >= 3 ? true : false}
                    />
                    <Button
                        variant="contained"
                        className={classes.addButton}
                        type="submit"
                        disabled={codes.length >= 3 ? true : false}
                    >
                        Add
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
}
