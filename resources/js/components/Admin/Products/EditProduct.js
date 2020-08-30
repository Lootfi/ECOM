import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import { useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import {
    Grid,
    TextField,
    FormControl,
    Select,
    Button,
    Box,
    Typography
} from "@material-ui/core";
import { AuthenticatedUserContext } from "../../Contexts/AuthenticatedUserContext";
import { useForm } from "react-hook-form";

import PromoCode from "./PromoCode";
import DeleteProduct from "./DeleteProduct";
import EditImages from "./EditImages";

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

export default function EditProduct({ prodId }) {
    const classes = useStyles();
    const { isAdmin } = React.useContext(AuthenticatedUserContext);

    let { category, productId } = useParams();
    const [product, setProduct] = React.useState();
    const [images, setImages] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const { register, handleSubmit, watch, errors } = useForm();

    const onSave = data => {
        let fd = new FormData();
        for (let field in data) {
            fd.append(field, data[field]);
        }
        axios
            .post(`/api/products/${product.id}/update`, fd)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    React.useEffect(() => {
        axios
            .post(`/api/admins`)
            .then(res => {
                axios
                    .get(`/api/products/${productId ? productId : prodId}`)
                    .then(res => {
                        console.log(res.data);
                        setProduct(res.data);
                        setImages(res.data.imageurls.split(",").slice(0, -1));
                    })
                    .catch(err => console.log(err));
                axios
                    .get("/api/categories")
                    .then(res => setCategories(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => {
                window.location = "/";
            });
    }, []);

    return (
        <div className={classes.root}>
            {product && (
                <React.Fragment>
                    <React.Fragment>
                        <EditImages
                            images={images}
                            setImages={setImages}
                            productId={product.id}
                        />
                        <hr />
                        <Typography variant="h5" gutterBottom>
                            Edit Product
                        </Typography>
                        <form onSubmit={handleSubmit(onSave)}>
                            <Grid container spacing={1}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        defaultValue={product.name}
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
                                        defaultValue={product.prices.prix_achat}
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
                                        defaultValue={product.prices.prix_vente}
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
                                        defaultValue={product.brand}
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
                                        defaultValue={product.manufacturer}
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
                                        defaultValue={product.weight}
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
                                                        selected={
                                                            category.id ==
                                                            product.category_id
                                                        }
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
                                        defaultValue={product.stock}
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
                        <Box spacing={3}>
                            <DeleteProduct productId={product.id} />
                        </Box>
                    </React.Fragment>
                    <hr className={classes.divider} />
                    <PromoCode
                        promoCodes={product.promo_codes}
                        productId={product.id}
                    />
                </React.Fragment>
            )}
        </div>
    );
}
