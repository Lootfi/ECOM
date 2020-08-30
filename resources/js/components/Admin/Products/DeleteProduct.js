import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
    deleteButton: {
        border: "2px solid",
        borderColor: fade(theme.palette.warning.main, 0.8),
        backgroundColor: theme.palette.common.white,
        color: theme.palette.warning.main,
        width: "100px"
    }
}));

export default function DeleteProduct({ productId }) {
    const classes = useStyles();
    const { handleSubmit: handleDelete } = useForm();

    const onDelete = data => {
        axios
            .post(`/api/products/${productId}/destroy`, data)
            .then(res => {
                window.location = `/`;
            })
            .catch(err => console.log(err));
    };
    return (
        <form onSubmit={handleDelete(onDelete)}>
            <Button
                variant="contained"
                className={classes.deleteButton}
                size="large"
                type="submit"
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
        </form>
    );
}
