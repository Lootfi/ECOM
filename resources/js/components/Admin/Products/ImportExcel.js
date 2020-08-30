import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button, Grid, TextField } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { fade, makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { AuthenticatedUserContext } from "../../Contexts/AuthenticatedUserContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 10px 10px 10px"
        },
        [theme.breakpoints.down("sm")]: {
            padding: "100px 10px 10px 10px"
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    editButton: {
        border: "2px solid",
        borderColor: fade(theme.palette.primary.main, 0.8),
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main
        // width: "100px"
    },
    inputFile: {
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        padding: "15px 0",
        cursor: "pointer"
    },
    labelFile: {
        border: "1px solid",
        borderRadius: "5px",
        padding: "16px 14px"
    },
    divider: {
        margin: "20px 0",
        border: "1px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "10px"
    }
}));

export default function ImportExcel() {
    const classes = useStyles();
    const { isAdmin } = React.useContext(AuthenticatedUserContext);

    const [fileIn, setFileIn] = React.useState(0);
    const { register, handleSubmit, watch, errors } = useForm();
    const [fieldNumbers, setFieldNumbers] = React.useState({
        name: null,
        prix_achat: null,
        prix_vente: null,
        brand: null,
        manufacturer: null,
        weight: null,
        category: null,
        stock: null
    });
    let handleInput = e => {
        setFileIn(1);
    };

    let handleChange = e => {
        setFieldNumbers({
            ...fieldNumbers,
            [e.target.name]: e.target.value
        });
    };

    const onSave = data => {
        let fd = new FormData();
        fd.append("file", data.file[0]);
        Object.keys(fieldNumbers).forEach(field => {
            fd.append(field, fieldNumbers[field]);
        });
        axios
            .post("/api/products/import", fd)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
        <div className={classes.root}>
            <form
                onSubmit={handleSubmit(onSave)}
                encType="multipart/form-data"
                files="true"
            >
                <input
                    type="file"
                    name="file"
                    label="Products"
                    ref={register({
                        required: true
                    })}
                    className={classes.inputFile}
                    onChange={handleInput}
                    accept=".xlsx"
                />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography>
                            Enter the column number of each product field, Note:
                            first column is 0
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <label htmlFor="file" className={classes.labelFile}>
                            <CloudUploadIcon />
                            {fileIn ? (
                                <span style={{ padding: "0 4px" }}>
                                    File Selected
                                </span>
                            ) : (
                                <span
                                    style={{
                                        padding: "0 10px"
                                    }}
                                >
                                    Select a file
                                </span>
                            )}
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            required
                            type="number"
                            name="name"
                            variant="outlined"
                            label="Name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Prix Achat"
                            name="prix_achat"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Prix Vente"
                            name="prix_vente"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            variant="outlined"
                            label="Brand"
                            name="brand"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            variant="outlined"
                            label="Manufacturer"
                            name="manufacturer"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            variant="outlined"
                            label="Weight"
                            name="weight"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Category Name"
                            name="category"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Stock"
                            name="stock"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <Button
                            variant="contained"
                            className={classes.editButton}
                            size="large"
                            startIcon={<EditIcon />}
                            type="submit"
                        >
                            Import
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
