import React from "react";
import {
    ListItem,
    ListItemSecondaryAction,
    IconButton,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
    category: {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(50)
    },
    icon: {
        color: "white"
    },
    field: {
        color: "white"
    }
}));

export default function CategoryItem({ category }) {
    const classes = useStyles();
    const [editable, setEditable] = React.useState(false);
    const [name, setName] = React.useState(category.name);
    const [errors, setErrors] = React.useState(null);
    let handleChange = e => {
        setName(e.target.value);
    };
    let editCategory = () => {
        setEditable(true);
    };
    let saveEdit = () => {
        axios
            .post("/api/categories/edit", { id: category.id, name: name })
            .then(res => {
                if (!res.data.errors) {
                    setEditable(false);
                    setErrors(null);
                } else {
                    setErrors(res.data.errors);
                }
            })
            .catch(err => console.log(err));
    };
    let handleDelete = () => {
        axios
            .post("/api/categories/delete", { id: category.id })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    return (
        <ListItem className={classes.category}>
            {editable ? (
                <React.Fragment>
                    <TextField
                        className={classes.field}
                        value={name}
                        onChange={handleChange}
                    />
                    {errors &&
                        errors.name.map(error => (
                            <Typography color="secondary">{error}</Typography>
                        ))}
                    {errors &&
                        errors.id.map(error => (
                            <Typography color="secondary">{error}</Typography>
                        ))}
                </React.Fragment>
            ) : (
                <Typography>
                    {category.products_count} {name}
                </Typography>
            )}
            <ListItemSecondaryAction>
                {editable ? (
                    <IconButton edge="end" onClick={saveEdit}>
                        <SaveIcon className={classes.icon} />
                    </IconButton>
                ) : (
                    <IconButton edge="end" onClick={editCategory}>
                        <EditIcon className={classes.icon} />
                    </IconButton>
                )}
                <IconButton onClick={handleDelete}>
                    <DeleteIcon color="secondary" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
