import React from "react";
import {
    Grid,
    Breadcrumbs,
    Link as MuiLink,
    Typography,
    Divider,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useParams, Link } from "react-router-dom";
import ProductImages from "./ProductImages";
import AddToCart from "../Cart/AddToCart"; //Button
import SimilarProducts from "./SimilarProducts";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 100,
        [theme.breakpoints.down("xs")]: {
            padding: "100px 5px 10px 5px"
        }
    },
    bread: {
        marginBottom: "20px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "10px"
        }
    },
    cartButtonGridItem: {
        display: "flex",
        flexDirection: "column"
    }
}));
function Product(props) {
    const classes = useStyles();
    let { category, productId } = useParams();
    const [product, setProduct] = React.useState();
    React.useEffect(() => {
        setProduct(null);
        axios
            .get(`/api/products/${productId}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.log(err));
    }, [productId]);

    return (
        <div className={classes.root}>
            {product ? (
                <React.Fragment>
                    <Breadcrumbs className={classes.bread}>
                        <Link to="/">Homepage</Link>
                        <Link to={`/categories/${product.category_id}`}>
                            {product.category.name}
                        </Link>
                        <Typography>{product.name.split("-")[0]}</Typography>
                    </Breadcrumbs>
                    <Divider
                        variant="middle"
                        style={{ marginBottom: "20px" }}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                            <ProductImages
                                images={product.imageurls
                                    .split(",")
                                    .slice(0, -1)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <h2>{product.name}</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4>
                                        <span>Price: </span>{" "}
                                        <b style={{ color: "red" }}>
                                            {product.prices.prix_vente}DA
                                        </b>
                                    </h4>
                                </Grid>
                                <Grid
                                    item
                                    className={classes.cartButtonGridItem}
                                >
                                    <AddToCart product={product} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <SimilarProducts productId={product.id} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
                <CircularProgress size={100} />
            )}
        </div>
    );
}

export default Product;
