import React from "react";
import {
    makeStyles,
    ListItem,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    NewCat: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(50),
        color: "white"
    },
    input: {
        color: "white"
    }
}));

export default function NewCategory({ categories, setCategories }) {
    const classes = useStyles();
    const [newCat, setNewCat] = React.useState("");
    const [errors, setErrors] = React.useState(null);

    let handleChange = e => {
        setNewCat(e.target.value);
        setErrors(null);
    };

    let handleSubmit = e => {
        axios
            .post("/api/categories/create", { name: newCat })
            .then(res => {
                if (res.data.errors) setErrors(res.data.errors.name);
                else {
                    setCategories([res.data, ...categories]);
                    setNewCat("");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <React.Fragment>
            <ListItem className={classes.NewCat}>
                <TextField
                    placeholder="Enter Category"
                    type="text"
                    inputProps={{
                        className: classes.input,
                        onChange: handleChange,
                        onKeyUp: e => e.keyCode == 13 && handleSubmit(e)
                    }}
                    value={newCat}
                />
                <ListItemSecondaryAction>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {errors && (
                <ListItem>
                    {errors.map(error => (
                        <Typography variant="caption">{error}</Typography>
                    ))}
                </ListItem>
            )}
        </React.Fragment>
    );
}
