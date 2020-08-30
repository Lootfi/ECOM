import React from "react";
import { Badge, Grid, Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
    delete: {
        color: theme.palette.warning.main,
        position: "absolute"
    }
}));

export default function EditableImage({ imageSrc, index, deleteImage }) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <img src={imageSrc} height="200" />
            <Button
                className={classes.delete}
                variant="outlined"
                onClick={() => deleteImage(index)}
            >
                <DeleteIcon />
            </Button>
        </Grid>
    );
}
