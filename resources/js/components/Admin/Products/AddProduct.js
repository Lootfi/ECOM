import React from "react";

import { fade, makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
    Grid,
    TextField,
    FormControl,
    Select,
    Button
} from "@material-ui/core";

import { AuthenticatedUserContext } from "../../Contexts/AuthenticatedUserContext";
import { useForm } from "react-hook-form";

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
        color: theme.palette.primary.main,
        width: "100px"
    },
    deleteButton: {
        border: "2px solid",
        borderColor: fade(theme.palette.warning.main, 0.8),
        backgroundColor: theme.palette.common.white,
        color: theme.palette.warning.main,
        width: "100px"
    },
    inputFile: {
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        padding: "15px 0"
    },
    labelFile: {
        border: "1px solid",
        borderRadius: "5px",
        padding: "16px 14px"
    }
}));

export default function AddProduct() {
    const classes = useStyles();
    const { isAdmin } = React.useContext(AuthenticatedUserContext);
    const [categories, setCategories] = React.useState([]);
    const { register, handleSubmit, watch, errors } = useForm();
    const [imgNumber, setImgNumber] = React.useState(0);
    const [imgs, setImgs] = React.useState();

    const onSave = data => {
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            data[i] = img;
        }
        let fd = new FormData();
        for (let field in data) {
            fd.append(field, data[field]);
        }
        fd.append("imgNum", imgs.length);
        axios
            .post(`/api/products/store`, fd, {})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    React.useEffect(() => {
        axios
            .get("/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    let handlePicInput = e => {
        let files = e.target.files;
        if (files.length > 3) {
            alert("nope, max is 3");
            return;
        }
        setImgs(files);
        setImgNumber(files.length);
    };

    return (
        <div className={classes.root}>
            <form
                onSubmit={handleSubmit(onSave)}
                encType="multipart/form-data"
                files="true"
            >
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <input
                            type="file"
                            name="picture[]"
                            label="Product Picture"
                            ref={register({
                                required: true
                            })}
                            onChange={handlePicInput}
                            className={classes.inputFile}
                            multiple
                            accept=".jpg,.png"
                        />
                        <label
                            htmlFor="picture[]"
                            className={classes.labelFile}
                        >
                            <CloudUploadIcon />
                            {imgNumber ? (
                                <span style={{ padding: "0 4px" }}>
                                    {imgNumber} images selected
                                </span>
                            ) : (
                                <span style={{ padding: "0 10px" }}>
                                    Choose a picture
                                </span>
                            )}
                        </label>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            defaultValue="Prod"
                            fullWidth
                            margin="normal"
                            type="text"
                            variant="outlined"
                            label="Name"
                            name="name"
                            inputRef={register({
                                required: true
                            })}
                        />
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                        <TextField
                            defaultValue="10"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Prix Achat"
                            name="prix_achat"
                            inputRef={register({
                                required: true
                            })}
                        />
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                        <TextField
                            defaultValue="10"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Prix Vente"
                            name="prix_vente"
                            inputRef={register({
                                required: true
                            })}
                        />
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                        <TextField
                            defaultValue="brand"
                            type="text"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Brand"
                            name="brand"
                            inputRef={register({
                                required: true
                            })}
                        />
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                        <TextField
                            defaultValue="manu"
                            type="text"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Manufacturer"
                            name="manufacturer"
                            inputRef={register({
                                required: true
                            })}
                        />
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                        <TextField
                            defaultValue="10 lb"
                            margin="normal"
                            type="text"
                            fullWidth
                            label="Weight"
                            name="weight"
                            variant="outlined"
                            inputRef={register({
                                required: true
                            })}
                        />
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                        <FormControl
                            variant="outlined"
                            className={classes.selectEmpty}
                            fullWidth
                        >
                            {categories && (
                                <Select
                                    native={true}
                                    name="category_id"
                                    labelId="Category"
                                    variant="outlined"
                                    id="category_select"
                                    inputRef={register({
                                        required: true
                                    })}
                                >
                                    {categories.map(category => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                        <TextField
                            defaultValue="10"
                            margin="normal"
                            fullWidth
                            type="number"
                            label="In Stock"
                            name="stock"
                            variant="outlined"
                            inputRef={register({
                                required: true
                            })}
                        />
                    </Grid>
                    <Grid item md={2} sm={3} xs={6}>
                        <Button
                            variant="contained"
                            className={classes.editButton}
                            size="large"
                            startIcon={<EditIcon />}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
